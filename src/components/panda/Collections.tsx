import CollectionItem from './CollectionItem'

export default function Collections(props) {

    const { data, onSell } = props
    return (
        <div>
            <label>Collections:</label>
            {
                data.map(e => <CollectionItem key={e.origin.num} data={e} onSell={onSell} />)
            }
        </div>
    )

}
