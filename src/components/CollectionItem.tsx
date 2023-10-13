import { OrdinalLock } from "../contracts/ordinalLock"
import { toHex, Scrypt, findSig, PubKey, MethodCallOptions, SensiletSigner } from 'scrypt-ts'
import { OrdNFTP2PKH, OrdProvider } from 'scrypt-ord'
import Inscription from "./Inscription"
import { useState } from "react"

export default function CollectionItem(props) {

    const { data, onSell } = props
    const { txid, vout } = data

    const [amount, setAmount] = useState(10n)

    async function getScript(txId: string, vout: number) {
        const tx = await Scrypt.bsvApi.getTransaction(txId)
        return tx.outputs[vout].script
    }

    async function parseUtxo(txId: string, vout: number) {
        const script = await getScript(txid, vout)
        return {
            txId,
            outputIndex: vout,
            script: script.toHex(),
            satoshis: 1
        }
    }

    async function sell() {
        const signer = new SensiletSigner(new OrdProvider())
        const publicKey = await signer.getDefaultPubKey()

        console.log(`seller public key: ${publicKey.toString()}`)
        console.log(`seller address: ${publicKey.toAddress().toString()}`)
        console.log(`sell amount: ${amount}`)
        console.log(data)
        console.log(`${data.origin.num}`)

        const instance = new OrdinalLock(PubKey(toHex(publicKey)), amount)
        await instance.connect(signer)

        const inscriptionUtxo = await parseUtxo(txid, vout)
        const inscriptionP2PKH = OrdNFTP2PKH.fromUTXO(inscriptionUtxo)
        await inscriptionP2PKH.connect(signer)

        const { tx } = await inscriptionP2PKH.methods.unlock(
            (sigResps) => findSig(sigResps, publicKey),
            PubKey(toHex(publicKey)),
            {
                transfer: instance,
                pubKeyOrAddrToSign: publicKey,
            } as MethodCallOptions<OrdNFTP2PKH>
        )
        console.log(`sell tx: ${tx.id}`)
        onSell(instance, data)
    }

    function amountOnChange(e) {
        setAmount(BigInt(e.target.value))
    }

    return (
        <div>
            <Inscription data={data} />
            <input type='number' value={amount.toString()} onChange={amountOnChange} />
            <button onClick={sell}>Sell</button>
        </div>
    )

}
