import { useCallback, useEffect, useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

import { ImageProps } from '~/types/common';

type LazyImageProps = ImageProps & {
  zoom?: boolean;
};

const Image = ({
  src,
  alt,
  className,
  zoom = false,
}: LazyImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const img = new window.Image();
      img.src = src;
      if (img.complete) {
        handleImageLoad();
      } else {
        img.onload = handleImageLoad;
      }
      return () => {
        img.onload = null;
      };
    }
  }, [src, handleImageLoad]);

  const imageElement = (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={handleImageLoad}
      className={`rounded-lg shadow-custom ${className} transition-opacity duration-500 ease-in-out ${
        imageLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );

  return (
    <div className="relative">
      {!imageLoaded && <div className="absolute inset-0 rounded-lg bg-shoko-bg-alt" />}
      {zoom
        ? (
          <Zoom zoomMargin={140}>
            {imageElement}
          </Zoom>
        )
        : imageElement}
    </div>
  );
};

export default Image;
