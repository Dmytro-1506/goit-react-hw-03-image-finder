import { Component } from 'react';
import axios from 'axios';
import {Searchbar} from './Searchbar/Searchbar';
import {ImageGallery} from './ImageGallery/ImageGallery';
import {ImageGalleryItem} from './ImageGalleryItem/ImageGalleryItem';
import {Loader} from './Loader/Loader';
import {Button} from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state={
    images: [],
  }
  onSubmit=(event)=>{
    event.preventDefault();
    const requestName = event.target.searchInput.value;
    const fetchImages = async () => {
        const KEY = '32403281-07d99c56a2826923173cf204d';
        try {
            const request = await axios.get(`https://pixabay.com/api/?q=${requestName}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`);
            return request;
        } catch (error) {
            console.log(error);
        }
    }
    const newRequest = async () => {
      const gotenImages = await fetchImages();
      this.setState({images: gotenImages.data.hits})
      return gotenImages 
    }
    newRequest();
    event.target.reset();
  }

  render(){ 
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
      <Searchbar onSubmit ={this.onSubmit}></Searchbar>
      <ImageGallery>
        <ImageGalleryItem images={this.state.images}/>
      </ImageGallery>
      <Loader></Loader>
      <Button></Button>
      <Modal></Modal>
    </div>
  )
}
}
