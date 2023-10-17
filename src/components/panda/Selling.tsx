import { Addr } from "scrypt-ts"
import Inscription from "../Inscription"
import { OrdiProvider } from "scrypt-ord"
import { PandaSigner } from "scrypt-ts/dist/bsv/signers/panda-signer"

export default function Selling(props) {

    const { data, instance, onPurchase } = props

    async function buy() {
        const signer = new PandaSigner(new OrdiProvider())
        const address = await signer.getOrdAddress()
        const { tx } = await instance.methods.purchase(Addr(address.toByteString()))
        console.log(`buy tx: ${tx.id}`)
        onPurchase()
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
