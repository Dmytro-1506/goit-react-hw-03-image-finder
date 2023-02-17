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

  componentDidUpdate = (prevProps, prevState) => {
    const { query, page } = this.state
    if (query !== prevState.query || page !== prevState.page) {
      this.setState({ loading: true })
      try {
        fetchImages(query, page).then(response => {
          this.setState(prevState => ({ images: [...prevState.images, ...response.data.hits], total: response.data.total }))
        })
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ loading: false })
      }
    }
  }

  onSubmit = (requestName) => {
      this.setState({ query: requestName, page: 1, images: [], total: 0 })
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
    const { images, query, page, total, largeImage, modalIsOpen, loading } = this.state;
    return (<div className='App'
    >
      <Searchbar onSubmit={this.onSubmit} prevRequest={query}></Searchbar>
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
