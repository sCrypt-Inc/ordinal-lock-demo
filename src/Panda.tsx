import { PandaSigner } from "scrypt-ts/dist/bsv/signers/panda-signer"
import { OrdiProvider } from "scrypt-ord"
import { useEffect, useState } from "react"
import { bsv } from 'scrypt-ts'
import './App.css';
import Selling from './components/panda/Selling';
import Collections from './components/panda/Collections'

export default function Panda() {

    const [connectedPayAddress, setConnectedPayAddress] = useState(undefined)
    const [connectedOrdiAddress, setConnectedOrdiAddress] = useState(undefined)
    const [collections, setCollections] = useState([])
    const [instanceOnSell, setInstanceOnSell] = useState(undefined)
    const [inscriptionOnSell, setInscriptionOnSell] = useState(undefined)

    useEffect(() => {
        loadCollections()
    }, [connectedOrdiAddress])

    function loadCollections() {
        if (connectedOrdiAddress) {
            const url = `https://v3.ordinals.gorillapool.io/api/txos/address/${connectedOrdiAddress.toString()}/unspent?bsv20=false`
            fetch(url).then(r => r.json()).then(r => r.filter(e => e.origin.data.insc.file.type !== 'application/bsv-20')).then(r => setCollections(r))
        }
    }

    function addressToString(addr: bsv.Address): string {
        return addr === undefined
            ? 'Not Connected'
            : addr.toString()
    }

    function connected(): boolean {
        return connectedPayAddress !== undefined && connectedOrdiAddress !== undefined
    }

    async function connect() {
        const signer = new PandaSigner(new OrdiProvider())
        const { isAuthenticated, error } = await signer.requestAuth()
        if (!isAuthenticated) {
            throw new Error(`Unauthenticated: ${error}`)
        }
        setConnectedPayAddress(await signer.getDefaultAddress())
        setConnectedOrdiAddress(await signer.getOrdAddress())
    }

    function onSell(instance, inscription) {
        setInstanceOnSell(instance)
        setInscriptionOnSell(inscription)
    }

    function onPurchase() {
        setInstanceOnSell(undefined)
        setInscriptionOnSell(undefined)
        loadCollections()
    }

    return (
        <div className="App">
            <header className="App-header">
                <h2>Panda</h2>

                <label>Pay Address: {addressToString(connectedPayAddress)}</label>
                <label>Ordi Address: {addressToString(connectedOrdiAddress)}</label>

                {
                    connected()
                        ? ''
                        : <button onClick={connect}>Connect</button>
                }

                {
                    instanceOnSell !== undefined
                        ? <Selling data={inscriptionOnSell} instance={instanceOnSell} onPurchase={onPurchase} />
                        : connected()
                            ? <Collections data={collections} onSell={onSell} />
                            : ''
                }
            </header>
        </div>
    )
}
