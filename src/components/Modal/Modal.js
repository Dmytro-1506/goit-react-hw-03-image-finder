import { Component } from 'react';

export class Modal extends Component {
    closeCallback = (event) => {
        const { closeModal } = this.props;
        if (event.key === 'Escape') {
            closeModal();
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.closeCallback)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.closeCallback)
    }

    render() {
        const { image } = this.props;
        
        return <div className="Overlay">
            <div className="Modal">
                <img src={image} alt={image} />
            </div>
        </div>
    }
}