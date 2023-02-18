import { Component } from 'react';

export class Modal extends Component {
    closeCallback = (event) => {
        const { closeModal } = this.props;
        if (event.key === 'Escape' || event.target === event.currentTarget) {
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
        
        return <div className="Overlay" onClick={this.closeCallback} >
            <div className="Modal">
                <img src={image} alt={image} />
            </div>
        </div>
    }
}