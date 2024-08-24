import cx from 'classnames';
import { ButtonProps } from '~/types/common';

export const buttonStyle = {
  primary: 'bg-shoko-link text-shoko-text-alt hover:bg-shoko-link-hover hover:text-shoko-text-alt',
  secondary: 'bg-shoko-button-alt text-shoko-text-alt hover:bg-shoko-button-alt-hover hover:text-shoko-text-alt',
  outline: 'border-2 border-shoko-link text-shoko-header-text hover:bg-shoko-link-hover hover:text-shoko-text-alt',
  circle: '!p-3 bg-shoko-bg border border-shoko-border hover:bg-shoko-link-hover hover:text-shoko-text-alt',
  text: 'text-shoko-text-header hover:text-shoko-link-hover',
  breadcrumb: '!p-0 text-2xl text-shoko-link-header font-header font-medium hover:text-shoko-link-header-hover',
  download:
    'bg-shoko-bg-alt text-shoko-text-header border border-shoko-border hover:bg-shoko-link-hover hover:text-shoko-text-alt',
};

const Button = ({ buttonType, className, id, children, disabled, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      id={id}
      className={cx(
        'flex items-center justify-center gap-x-3 p-4 font-body transition-colors duration-500 ease-in-out focus:outline-none',
        buttonStyle[buttonType],
        buttonType === 'circle' ? 'rounded-full' : 'rounded-lg',
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
