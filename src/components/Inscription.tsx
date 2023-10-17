export default function Inscription(props) {

    const { outpoint: origin, num } = props.data.origin
    const src = `https://v3.ordinals.gorillapool.io/content/${origin}`

    return (
        <div>
            <img src={src} />
            <label>#{num === null ? 'unconfirmed' : `${num}`}</label>
        </div>
    )
}
