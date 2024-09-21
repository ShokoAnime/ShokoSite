import Button from '~/components/common/Button';
import { BookHeart, Download } from 'lucide-react';

const Hero = () => {
  return (
    <div className="mx-auto my-16 flex max-w-[850px] flex-col justify-center gap-8 text-center">
      <div className="flex flex-col gap-4">
        <h1>The All-in-One Cross-Platform Anime Management System Built For You</h1>
        <div className="text-shoko-18 font-semibold md:text-shoko-24">
          Let Shoko Take You To The <strong>Future</strong>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-6 md:flex-row">
        <Button buttonType="primary">
          <Download />
          Download
        </Button>
        <Button buttonType="outline">
          <BookHeart />
          Getting Started
        </Button>
      </div>
    </div>
  );
};

export default Hero;
