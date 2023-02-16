export const Modal = ({ image, closeModal }) => {
    window.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            closeModal()
        }
    })
    return <div className="Overlay">
        <div className="Modal">
            <img src={image} alt={image} />
        </div>
    </div>
}