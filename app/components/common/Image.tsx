import { useEffect, useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { useWindowSize } from '~/hooks/useWindowSize';
import { ImageProps } from '~/types/common';

const Image = ({ src, alt, className = '', zoom = false }: ImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { width } = useWindowSize();

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => setImageLoaded(true);
  }, [src]);

  const imageElement = (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`w-full max-w-[330px] rounded-lg shadow-custom transition-opacity duration-500 ease-in-out ${
        imageLoaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    />
  );

  const zoomMargin = width <= 768 ? 20 : 140;

  return (
    <div className="relative">
      {!imageLoaded && <div className="absolute inset-0 rounded-lg bg-shoko-bg-alt" />}
      {zoom
        ? (
          <Zoom zoomImg={{ src: src, srcSet: src }} zoomMargin={zoomMargin}>
            {imageElement}
          </Zoom>
        )
        : imageElement}
    </div>
  );
};

export default Image;
