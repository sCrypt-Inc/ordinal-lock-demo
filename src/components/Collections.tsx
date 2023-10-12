import CollectionItem from './CollectionItem'

export default function Collections(props) {

    const { data, onSell } = props
    return (
        <div>
            {
                data.length === 0
                    ? ''
                    : <label>Collections:</label>
            }
            {
                data.map(e => <CollectionItem key={e.origin.num} data={e} onSell={onSell} />)
            }
        </div>
    )

}
