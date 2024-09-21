import { useBackground } from '~/hooks/useBackground';
import cx from 'classnames';

const Footer = () => {
  const { backgroundImageHeight } = useBackground();

  return (
    <footer
      className={cx(`relative flex items-center justify-center py-6`, backgroundImageHeight ? '' : 'bg-shoko-bg-alt')}
    >
      <div className="flex flex-col gap-1 text-center">
        <div>© 2016-2024 Shoko.All rights reserved.</div>
        <div>Images and related content are used for reference and non-commercial purposes.</div>
        <div>All copyrights and trademarks are the property of their respective owners.</div>
      </div>
    </footer>
  );
};

export default Footer;
