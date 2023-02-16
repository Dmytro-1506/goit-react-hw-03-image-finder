import axios from 'axios';

const KEY = '32403281-07d99c56a2826923173cf204d';

export const fetchImages = async (requestName, page) => {
    try {
        const request = await axios.get(`https://pixabay.com/api/?q=${requestName}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`);
        return request;
    } catch (error) {
        console.log(error);
    }
}