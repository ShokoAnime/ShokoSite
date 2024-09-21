import { useState } from 'react';
import { useBetween } from 'use-between';

type BackgroundState = {
  backgroundImage: string | null;
  backgroundImageHeight: string | number | null;
  setBackgroundImage: (backgroundImage: string | null) => void;
  setBackgroundImageHeight: (backgroundImageHeight: string | number | null) => void;
  resetBackground: () => void;
};

const useBackgroundState = (): BackgroundState => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [backgroundImageHeight, setBackgroundImageHeight] = useState<string | number | null>(null);

  const resetBackground = () => {
    setBackgroundImage(null);
    setBackgroundImageHeight(null);
  };

  return {
    backgroundImage,
    backgroundImageHeight,
    setBackgroundImage,
    setBackgroundImageHeight,
    resetBackground,
  };
};

export const useBackground = () => useBetween(useBackgroundState);
