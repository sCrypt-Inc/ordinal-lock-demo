import { Addr, SensiletSigner } from "scrypt-ts"
import Inscription from "./Inscription"
import { ScryptProvider } from "scrypt-ts"

export default function Selling(props) {

    const { data, instance, onPurchase } = props

    async function buy() {
        const signer = new SensiletSigner(new ScryptProvider())
        const address = await signer.getDefaultAddress()
        const { tx } = await instance.methods.purchase(Addr(address.toByteString()))
        console.log(`buy tx: ${tx.id}`)
        onPurchase(tx)
    }

    return (
        <div>
            <label>Selling:</label>
            <Inscription data={data} />
            <label>{instance.amount.toString()} sat</label>
            <button onClick={buy}>Buy</button>
        </div>
    )

}
