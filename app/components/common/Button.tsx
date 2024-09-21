import { Link } from '@remix-run/react';
import cx from 'classnames';
import { ButtonProps } from '~/types/common';

const buttonStyle = {
  primary: 'bg-shoko-link text-shoko-btn-text gap-x-2 px-4 py-3 hover:bg-shoko-btn-hover font-semibold',
  outline:
    'border border-shoko-link text-shoko-text gap-x-2 px-4 py-3 hover:text-shoko-text hover:bg-shoko-bg font-semibold',
  round: 'bg-shoko-bg border border-shoko-border text-shoko-text-header hover:text-shoko-link gap-x-3 p-4',
  text: 'text-shoko-text-header hover:text-shoko-link',
};

const NormalButton = ({ buttonType, className, id, children, disabled, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      id={id}
      className={cx(
        'flex items-center justify-center font-body transition-colors duration-500 ease-in-out focus:outline-none',
        buttonStyle[buttonType],
        buttonType === 'round' ? 'rounded-full' : 'rounded-lg',
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const InternalButton = ({ buttonType, className, id, children, to }: ButtonProps) => {
  return (
    <Link
      type="button"
      id={id}
      className={cx(
        'flex items-center justify-center font-body transition-colors duration-500 ease-in-out focus:outline-none',
        buttonStyle[buttonType],
        buttonType === 'round' ? 'rounded-full' : 'rounded-lg',
        className,
      )}
      to={to ?? '/'}
    >
      {children}
    </Link>
  );
};

const Button = ({ buttonType, className, id, children, disabled, onClick, to }: ButtonProps) => {
  return (
    to
      ? (
        <InternalButton
          buttonType={buttonType}
          className={className}
          id={id}
          disabled={disabled}
          onClick={onClick}
          to={to}
        >
          {children}
        </InternalButton>
      )
      : (
        <NormalButton
          buttonType={buttonType}
          className={className}
          id={id}
          disabled={disabled}
          onClick={onClick}
        >
          {children}
        </NormalButton>
      )
  );
};

export default Button;
