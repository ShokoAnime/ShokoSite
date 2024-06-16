import { mdiBookOpenOutline, mdiDownload, mdiPlay } from '@mdi/js';
import Button from '~/components/common/Button';
import Icon from '~/components/common/Icon';

const Hero = () => {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-16 2xl:px-0">
      <div className="flex flex-col gap-x-16 2xl:flex-row">
        <div className="flex flex-col items-center justify-center gap-y-8 text-center">
          <h1 className="w-full max-w-[53.125rem] text-pretty">
            The All-in-One Cross-Platform Anime Management System Built For You
          </h1>
          <h4 className="text-shoko-text w-full">
            Let Shoko take you to the future
          </h4>
          <div className="flex gap-x-2">
            <Button buttonType="primary">
              <Icon icon={mdiDownload} />
              <span>Download Ver 4.3.0</span>
            </Button>
            <Button buttonType="outline" onClick={() => window.open('https://docs.shokoanime.com', '_blank')}>
              <Icon icon={mdiBookOpenOutline} />
              <span>Getting Started</span>
            </Button>
          </div>
        </div>
        <div className="relative w-full 2xl:w-fit">
          <img
            className="shadow-custom mx-auto flex items-center rounded-lg 2xl:max-w-[630px]"
            src="/images/home/video-placeholder.webp"
            alt="preview webp"
          />
          <Button
            buttonType="primary"
            className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center !rounded-full"
          >
            <Icon icon={mdiPlay} size={48} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
