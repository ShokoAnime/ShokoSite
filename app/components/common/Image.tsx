import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

type ImageProps = {
  src: string;
  alt: string;
  className?: string;
  key?: string;
};

const Image = ({ src, alt, className, key }: ImageProps) => {
  return (
    <Zoom key={key} zoomMargin={65}>
      <img className={className} src={src} alt={alt} />
    </Zoom>
  );
};

export default Image;
