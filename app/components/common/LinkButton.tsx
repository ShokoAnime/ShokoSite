import { Link } from '@remix-run/react';
import cx from 'classnames';

import { ButtonProps } from '~/types/common';
import { buttonStyle } from '~/components/common/Button';

const LinkButton = ({ buttonType, className, children, to }: ButtonProps) => (
  <Link
    to={to ?? '/'}
    className={cx(
      'flex items-center gap-x-3 p-4 font-body transition-colors duration-500 ease-in-out focus:outline-none',
      buttonStyle[buttonType],
      buttonType === 'circle' ? 'rounded-full' : 'rounded-lg',
      className,
    )}
  >
    {children}
  </Link>
);

export default LinkButton;
