import { Component } from 'react';
import {Searchbar} from './Searchbar/Searchbar';
import {ImageGallery} from './ImageGallery/ImageGallery';
import {ImageGalleryItem} from './ImageGalleryItem/ImageGalleryItem';
import {Loader} from './Loader/Loader';
import {Button} from './Button/Button';
import { Modal } from './Modal/Modal';
import { fetchImages } from './Service/Fetch'

export class App extends Component {
  state = {
    images: [],
    page: 1,
    total: 0,
    query: '',
    largeImage: '',
    modalIsOpen: false,
    loading: false
  }

  componentDidUpdate = async (prevProps, prevState) => {
    const { query, page } = this.state
    if (query !== prevState.query || page !== prevState.page) {
      const request = await fetchImages(query, page);
      this.setState(prevState => ({ images: [...prevState.images, ...request.data.hits], total: request.data.total, loading: false }))
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    const requestName = event.target.searchInput.value;
    if (this.state.query !== requestName) {
      this.setState({ query: requestName, page: 1, images: [], total: 0, loading: true })
    }
    event.target.reset();
  }

  onClickLoadMore = () => {
    this.setState(prevState=>({ page: prevState.page + 1 }))
  }

  openModal = (image) => {
    this.setState({ largeImage: image.largeImageURL, modalIsOpen: true })
  }

  closeModal = () => {
    this.setState({modalIsOpen: false })
  }

  render() { 
    const { images, page, total, largeImage, modalIsOpen, loading } = this.state;
    return (<div className='App'
    >
      <Searchbar onSubmit={this.onSubmit}></Searchbar>
      <ImageGallery>
        <ImageGalleryItem images={images} openModal={this.openModal} />
      </ImageGallery>
      {loading && <Loader />}
      {(page < total/12) && <Button loadMore={this.onClickLoadMore} />}
      {modalIsOpen && <Modal image={largeImage} closeModal={this.closeModal} />}
    </div>
    )
  }
}
