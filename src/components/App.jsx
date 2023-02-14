import { Component } from 'react';
import axios from 'axios';
import {Searchbar} from './Searchbar/Searchbar';
import {ImageGallery} from './ImageGallery/ImageGallery';
import {ImageGalleryItem} from './ImageGalleryItem/ImageGalleryItem';
import {Loader} from './Loader/Loader';
import {Button} from './Button/Button';
import { Modal } from './Modal/Modal';

const KEY = '32403281-07d99c56a2826923173cf204d';

export class App extends Component {
  state = {
    images: [],
    page: 1,
    total: 0,
    query: '',
    largeImage: '',
    modalIsOpen: false
  }

  fetchImages = async (requestName) => {
    // console.log('first load', this.state.page)
    try {
      const request = await axios.get(`https://pixabay.com/api/?q=${requestName}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`);
      this.setState(prevState=>({ images: [...prevState.images, ...request.data.hits], total: request.data.total }))
      return request;
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit = (event) => {
    event.preventDefault();
    const requestName = event.target.searchInput.value;
    if (this.state.query !== requestName) {
      this.setState({ query: requestName, page: 1, images: [], total: 0 })
      this.fetchImages(requestName)
    }
    event.target.reset();
  }

  onClickLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }))
    // console.log('load more', this.state.page)
    this.fetchImages(this.state.query)
  }

  keyPress = (e) => {
    // console.log('press Escape')
    if (e.key === "Escape") {
      this.setState({ modalIsOpen: false })
      window.removeEventListener('keydown', this.keyPress);
    }
  }

  openModal = (image) => {
    this.setState({ largeImage: image.largeImageURL, modalIsOpen: true })
    window.addEventListener('keydown', (event) => {
      this.keyPress(event)
    });
  }

  render() { 
    const { images, page, total, largeImage, modalIsOpen } = this.state;
    // console.log(page, total)
    return (<div className='App'
    // style={{
    //   height: '100vh',
    //   display: 'flex',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   fontSize: 40,
    //   color: '#010101'
    // }}
    >
      <Searchbar onSubmit={this.onSubmit}></Searchbar>
      <ImageGallery>
        <ImageGalleryItem images={images} openModal={this.openModal} />
      </ImageGallery>
      <Loader></Loader>
      {(page < total/12) && <Button loadMore={this.onClickLoadMore} />}
      {modalIsOpen && <Modal image={largeImage} />}
    </div>
    )
  }
}
