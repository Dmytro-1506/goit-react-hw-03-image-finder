export const ImageGalleryItem = ({ images}) => {
    return images.map(image => {
        return <li key={image.id} className="ImageGalleryItem">
        <img src={image.webformatURL} alt={image.tags} className="ImageGalleryItem-image" />
    </li>
    })
}