import React, { useEffect, useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

type ImageProps = {
  src: string;
  alt: string;
  className?: string;
  zoom?: boolean;
};

const Image: React.FC<ImageProps> = ({ src, alt, className = '', zoom = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

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
      className={`w-full max-w-[330px] rounded-lg shadow-custom transition-opacity duration-500 ease-in-out ${
        imageLoaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
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
