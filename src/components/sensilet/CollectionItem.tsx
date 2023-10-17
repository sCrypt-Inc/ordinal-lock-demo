import { OrdinalLock } from "../../contracts/ordinalLock"
import { toHex, findSig, PubKey, MethodCallOptions, SensiletSigner, DefaultProvider } from 'scrypt-ts'
import { OrdiNFTP2PKH, OrdiProvider } from 'scrypt-ord'
import Inscription from "../Inscription"
import { useState } from "react"

export default function CollectionItem(props) {

    const { data, onSell } = props
    const { txid, vout } = data

    const [amount, setAmount] = useState(10n)

    async function getScript(txId: string, vout: number) {
        const provider = new DefaultProvider()
        await provider.connect()
        const tx = await provider.getTransaction(txId)
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
        const signer = new SensiletSigner(new OrdiProvider())
        const publicKey = await signer.getDefaultPubKey()

        console.log(`seller public key: ${publicKey.toString()}`)
        console.log(`seller address: ${publicKey.toAddress().toString()}`)
        console.log(`sell amount: ${amount}`)
        console.log(data)
        console.log(`${data.origin.num}`)

        const instance = new OrdinalLock(PubKey(toHex(publicKey)), amount)
        await instance.connect(signer)

        const inscriptionUtxo = await parseUtxo(txid, vout)
        const inscriptionP2PKH = OrdiNFTP2PKH.fromUTXO(inscriptionUtxo)
        await inscriptionP2PKH.connect(signer)

        const { tx } = await inscriptionP2PKH.methods.unlock(
            (sigResps) => findSig(sigResps, publicKey),
            PubKey(toHex(publicKey)),
            {
                transfer: instance,
                pubKeyOrAddrToSign: publicKey,
            } as MethodCallOptions<OrdiNFTP2PKH>
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
