import { mdiBookOpenOutline, mdiDownload, mdiPlay } from '@mdi/js';

import Button from '~/components/common/Button';
import Icon from '~/components/common/Icon';
import Text from '~/components/common/Text';

const Hero = () => {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-16 2xl:px-0">
      <div className="flex flex-col gap-x-16 xl:flex-row">
        <div className="flex flex-col items-center justify-center gap-y-8 text-center">
          <Text className="w-full max-w-[50rem] lg:max-w-[53.125rem]" size="h1">
            The All-in-One Cross-Platform Anime Management System Built For You
          </Text>
          <Text size="h3">
            Let Shoko take you to the future
          </Text>
          <div className="flex w-full flex-col gap-4 sm:w-fit sm:flex-row">
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
        <div className="relative mt-8 w-full xl:mt-0 xl:w-fit">
          <img
            className="mx-auto flex items-center rounded-lg shadow-custom 2xl:max-w-[630px]"
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
