import { Component } from 'react';

export class Modal extends Component {
    closeCallback = (event) => {
        const { closeModal } = this.props;
        if (event.key === 'Escape' || event.target === event.currentTarget) {
            closeModal();
        }
    }

    componentDidMount() {
        const overlay = document.querySelector('.Overlay')
        window.addEventListener('keydown', this.closeCallback)
        overlay.addEventListener('click', this.closeCallback)
    }

    componentWillUnmount() {
        const overlay = document.querySelector('.Overlay')
        window.removeEventListener('keydown', this.closeCallback)
        overlay.removeEventListener('click', this.closeCallback)
    }

    render() {
        const { image } = this.props;
        
        return <div className="Overlay" >
            <div className="Modal">
                <img src={image} alt={image} />
            </div>
        </div>
    }
}