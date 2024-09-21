import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

import { ImageProps } from '~/types/common';

const Image = ({ src, alt, className }: ImageProps) => {
  return (
    <Zoom zoomMargin={140}>
      <img className={`rounded-lg shadow-custom ${className}`} src={src} alt={alt} />
    </Zoom>
  );
};

export default Image;
