import {Searchbar} from './Searchbar/Searchbar'
import {ImageGallery} from './ImageGallery/ImageGallery'
import {ImageGalleryItem} from './ImageGalleryItem/ImageGalleryItem'
import {Loader} from './Loader/Loader'
import {Button} from './Button/Button'
import { Modal } from './Modal/Modal'

export const App = () => {
  return (
    <div className='App'
      // style={{
      //   height: '100vh',
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   fontSize: 40,
      //   color: '#010101'
      // }}
    >
      <Searchbar ></Searchbar>
      <ImageGallery></ImageGallery>
      <ImageGalleryItem></ImageGalleryItem>
      <Loader></Loader>
      <Button></Button>
      <Modal></Modal>
    </div>
  );
};
