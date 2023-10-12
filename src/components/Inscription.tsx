export default function Inscription(props) {

    const { outpoint, num } = props.data.origin

    const src = `https://res.cloudinary.com/de4cdbhoe/image/fetch/h_300,c_thumb/https://ordinals.gorillapool.io/api/files/inscriptions/${outpoint}`
    return (
        <div>
            <img src={src} />
            <label>#{num}</label>
        </div>
    )
}
