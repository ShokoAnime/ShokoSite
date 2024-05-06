import React, { ReactNode } from 'react';
import cx from 'classnames';

type ButtonProps = {
  buttonType: 'primary' | 'padded' | 'outline' | 'breadcrumb' | 'circle' | 'resource' | 'text';
  children: ReactNode;
  className?: string;
  id?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Button = ({ buttonType, className, id, children, onClick }: ButtonProps) => {
  const buttonStyle = {
    primary: 'bg-shoko-link text-shoko-text-alt hover:bg-shoko-link-hover hover:text-shoko-text-alt',
    padded: 'text-shoko-header-text hover:bg-shoko-link-hover hover:text-shoko-text-alt',
    outline: 'border border-shoko-link text-shoko-text-header hover:bg-shoko-link-hover hover:text-shoko-text-alt',
    breadcrumb: 'py-0 px-2 text-2xl font-medium text-shoko-link-header hover:text-shoko-link-header-hover',
    circle: '!p-3 bg-shoko-bg border border-shoko-border hover:bg-shoko-link-hover hover:text-shoko-text-alt',
    resource: 'py-2 bg-shoko-bg-alt text-shoko-text-header hover:bg-shoko-link-hover hover:text-shoko-text-alt',
    text: 'py-0 text-shoko-text-header hover:text-shoko-link',
  };

  return (
    <button
      type="button"
      id={id}
      className={cx(
        'flex items-center gap-x-3 p-4 font-medium transition-colors duration-500 ease-in-out focus:outline-none',
        buttonStyle[buttonType],
        buttonType === 'circle' ? 'rounded-full' : 'rounded-lg',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
