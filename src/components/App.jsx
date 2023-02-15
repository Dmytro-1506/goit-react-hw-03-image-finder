import { Component } from 'react';
import axios from 'axios';
import {Searchbar} from './Searchbar/Searchbar';
import {ImageGallery} from './ImageGallery/ImageGallery';
import {ImageGalleryItem} from './ImageGalleryItem/ImageGalleryItem';
import {Loader} from './Loader/Loader';
import {Button} from './Button/Button';
import { Modal } from './Modal/Modal';

const KEY = '32403281-07d99c56a2826923173cf204d';
const fetchImages = async (requestName, page) => {
    console.log('fetchImages', page)
    try {
      const request = await axios.get(`https://pixabay.com/api/?q=${requestName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`);
      return request;
    } catch (error) {
      console.log(error);
    }
}
function keyPress(e) {
  console.log('keyPress')
  if (e.key === "Escape") {
    window.removeEventListener('keydown', keyPress)
    return true
  }
}

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

  onSubmit = async (event) => {
    event.preventDefault();
    const requestName = event.target.searchInput.value;
    if (this.state.query !== requestName) {
      this.setState({ query: requestName, page: 1, images: [], total: 0, loading: true })
      const request = await fetchImages(requestName, 1);
      this.setState({ images: request.data.hits, total: request.data.total, loading: false })
    }
    event.target.reset();
  }

  onClickLoadMore = async () => {
    console.log('load more before', this.state.page)
    this.setState({ page: this.state.page + 1 })
    console.log('first load more', this.state.page)
    const request = await fetchImages(this.state.query, this.state.page + 1);
    this.setState(prevState=>({ images: [...prevState.images, ...request.data.hits]}))
    console.log('second load more', this.state.page)
  }

  openModal = (image) => {
    this.setState({ largeImage: image.largeImageURL, modalIsOpen: true })
    window.addEventListener('keydown', (event) => {
      if (keyPress(event)) {
        this.setState({ modalIsOpen: false })
      }
    });
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
      {modalIsOpen && <Modal image={largeImage} />}
    </div>
    )
  }
}
