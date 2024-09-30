import { Link } from '@remix-run/react';
import cx from 'classnames';
import { ButtonProps } from '~/types/common';

const buttonStyle = {
  primary: 'bg-shoko-link text-shoko-btn-text hover:bg-shoko-btn-hover hover:text-shoko-btn-text',
  secondary: 'border border-shoko-link bg-shoko-bg text-shoko-text hover:text-shoko-btn-text hover:bg-shoko-btn-hover',
  outline: 'border border-shoko-link text-shoko-text hover:text-shoko-text hover:bg-shoko-bg',
  round: 'bg-shoko-bg border border-shoko-border text-shoko-text-header hover:text-shoko-link',
  text: 'text-shoko-text-header hover:text-shoko-link',
};

const baseButtonClasses = `
  flex items-center justify-center
  font-body font-semibold
  transition-all duration-300 ease-in-out
  focus:outline-none focus:ring-2 focus:ring-shoko-link focus:ring-opacity-50
  disabled:opacity-50 disabled:cursor-not-allowed
`;

const sizeClasses = {
  small: 'text-sm px-3 py-2 gap-x-1.5',
  medium: 'text-base px-4 py-3 gap-x-2',
  large: 'text-lg px-5 py-3.5 gap-x-2.5',
};

const Button = ({
  buttonType = 'primary',
  size = 'medium',
  className,
  id,
  children,
  disabled,
  onClick,
  to,
  href,
}: ButtonProps & { size?: 'small' | 'medium' | 'large' }) => {
  const classes = cx(
    baseButtonClasses,
    buttonStyle[buttonType],
    sizeClasses[size],
    buttonType === 'round' ? 'rounded-full' : 'rounded-lg',
    className,
  );

  const commonProps = {
    id,
    className: classes,
    disabled,
  };

  if (href) {
    return (
      <a
        {...commonProps}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link
        {...commonProps}
        to={to}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      {...commonProps}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
