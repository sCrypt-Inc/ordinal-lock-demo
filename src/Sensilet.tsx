import { useEffect, useState } from 'react';
import { SensiletSigner } from 'scrypt-ts';
import './App.css';
import Collections from './components/sensilet/Collections'
import Selling from './components/sensilet/Selling';
import { OrdiProvider } from 'scrypt-ord';

export default function Sensilet() {
    const [connectedAddress, setConnectedAddress] = useState(undefined)
    const [collections, setCollections] = useState([])
    const [instanceOnSell, setInstanceOnSell] = useState(undefined)
    const [inscriptionOnSell, setInscriptionOnSell] = useState(undefined)

    useEffect(() => {
        loadCollections()
    }, [connectedAddress])

    function loadCollections() {
        if (connectedAddress) {
            const url = `https://v3.ordinals.gorillapool.io/api/txos/address/${connectedAddress.toString()}/unspent?bsv20=false`
            fetch(url).then(r => r.json()).then(r => r.filter(e => e.origin.data.insc.file.type !== 'application/bsv-20')).then(r => setCollections(r))
        }
    }

    function onSell(instance, inscription) {
        setInstanceOnSell(instance)
        setInscriptionOnSell(inscription)
        setConnectedAddress(undefined)
    }

    function onPurchase() {
        setInstanceOnSell(undefined)
        setInscriptionOnSell(undefined)
        setConnectedAddress(undefined)
    }

    async function connect() {
        const signer = new SensiletSigner(new OrdiProvider())
        const { isAuthenticated, error } = await signer.requestAuth()
        if (!isAuthenticated) {
            throw new Error(`Unauthenticated: ${error}`)
        }
        const address = await signer.getDefaultAddress()
        setConnectedAddress(address)
    }

    return (
        <div className="App">
            <header className="App-header">
                <label>My Address:
                    {
                        connectedAddress === undefined
                            ? 'Not Connected'
                            : connectedAddress.toString()
                    }
                </label>
                {
                    connectedAddress === undefined
                        ? <button onClick={connect}>Connect</button>
                        : ''
                }
                {
                    instanceOnSell !== undefined
                        ? <Selling data={inscriptionOnSell} instance={instanceOnSell} onPurchase={onPurchase} />
                        : connectedAddress === undefined
                            ? ''
                            : <Collections data={collections} onSell={onSell} />
                }
            </header>
        </div>
    );
}
