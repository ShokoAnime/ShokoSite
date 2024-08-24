import React from 'react';
import cx from 'classnames';

type TextProps = {
  children: React.ReactNode;
  size: 'h1' | 'h2' | 'h3' | 'h4' | 'blogHeader' | 'blogText' | 'pageBannerText';
  type?: 'body' | 'header';
  className?: string;
};

const Text = ({ children, className, size, type = 'body' }: TextProps) => {
  const sizeMap = {
    h1: 'text-2xl md:text-3xl lg:text-4xl',
    h2: 'text-2xl md:text-3xl lg:text-4xl',
    h3: 'text-lg md:text-xl lg:text-2xl',
    h4: 'text-xl lg:text-2xl',
    blogHeader: 'text-lg sm:text-xl',
    blogText: 'text-md sm:text-base',
    pageBannerText: 'text-base md:text-xl lg:text-2xl',
  };

  const typeMap = {
    body: 'text-shoko-text-body',
    header: 'text-shoko-text-header',
  };

  return (
    <div className={cx('text-pretty', typeMap[type], sizeMap[size], className)}>
      {children}
    </div>
  );
};

export default Text;
