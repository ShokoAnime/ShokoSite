import React from 'react';
import Button from '~/components/common/Button';
import { BookHeart, Download } from 'lucide-react';
import { useWindowSize } from '~/hooks/useWindowSize';

const Hero = () => {
  const { width } = useWindowSize();

  return (
    <div className="mx-auto my-8 flex max-w-[90%] flex-col justify-center gap-6 px-4 text-center sm:my-12 sm:max-w-[850px] sm:gap-8 lg:my-16">
      <div className="flex flex-col gap-3 sm:gap-4">
        <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl lg:leading-[3.5rem]">
          The All-in-One Cross-Platform Anime Management System Built For You
        </h1>
        <div className="text-lg font-semibold sm:text-xl md:text-2xl">
          Let Shoko Take You To The <strong>Future</strong>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-6">
        <Button
          buttonType="primary"
          size={width > 768 ? 'large' : 'medium'}
          to="/downloads/shoko-server"
          className="w-full sm:w-auto"
        >
          <Download size={20} />
          Download
        </Button>
        <Button
          buttonType="outline"
          size={width > 768 ? 'large' : 'medium'}
          href="https://docs.shokoanime.com"
          className="w-full sm:w-auto"
        >
          <BookHeart size={20} />
          Getting Started
        </Button>
      </div>
    </div>
  );
};

export default Hero;
