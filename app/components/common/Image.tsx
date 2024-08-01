import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

import { ImageProps } from '~/types/common';

const Image = ({ src, alt, className }: ImageProps) => {
  return <img className={className} src={src} alt={alt} />;
};

export default Image;
