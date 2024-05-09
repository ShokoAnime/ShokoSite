import React, { ReactNode } from 'react';
import { buttonStyle } from '~/components/common/Button';
import { Link } from '@remix-run/react';
import cx from 'classnames';

type Props = {
  buttonType: 'primary' | 'padded' | 'outline' | 'breadcrumb' | 'circle' | 'resource' | 'text';
  children: ReactNode;
  className?: string;
  to: string;
};

const LinkButton = ({ buttonType, className, children, to }: Props) => (
  <Link
    to={to}
    className={cx(
      'flex items-center gap-x-3 p-4 font-medium transition-colors duration-500 ease-in-out focus:outline-none',
      buttonStyle[buttonType],
      buttonType === 'circle' ? 'rounded-full' : 'rounded-lg',
      className,
    )}
  >
    {children}
  </Link>
);

export default LinkButton;
