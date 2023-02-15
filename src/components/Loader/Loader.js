import { Audio } from 'react-loader-spinner';

export const Loader = () => {
    return <div className='Overlay'>
        <Audio
            height='80px'
            width='80px'
            radius='9px'
            color='green'
            ariaLabel='loading'
            wrapperStyle
            wrapperClass />
    </div>
};
