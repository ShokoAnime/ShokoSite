import { useState } from 'react';
import { useBetween } from 'use-between';

type BackgroundState = {
  backgroundImage: string | null;
  backgroundImageFull: boolean;
  setBackgroundImage: (backgroundImage: string | null) => void;
  setBackgroundImageFull: (backgroundImageFull: boolean) => void;
  resetBackground: () => void;
};

const useBackgroundState = (): BackgroundState => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [backgroundImageFull, setBackgroundImageFull] = useState<boolean>(false);

  const resetBackground = () => {
    setBackgroundImage(null);
    setBackgroundImageFull(false);
  };

  return {
    backgroundImage,
    backgroundImageFull,
    setBackgroundImage,
    setBackgroundImageFull,
    resetBackground,
  };
};

export const useBackground = () => useBetween(useBackgroundState);
