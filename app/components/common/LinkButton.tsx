import { Link } from '@remix-run/react';
import cx from 'classnames';

import { ButtonProps } from '~/types/common';
import { buttonStyle } from '~/components/common/Button';
import { useMemo } from 'react';

const LinkButton = ({ buttonType, className, children, to }: ButtonProps) => {
  const btnStyles = useMemo(() => {
    const defaultStyle = buttonStyle[buttonType];
    switch (buttonType) {
      case 'circle':
        return cx(defaultStyle, 'rounded-full', className ?? '');
      default:
        return cx(defaultStyle, 'rounded-lg', className ?? '');
    }
  }, [className, buttonType, buttonStyle])
  return (<Link
    to={to ?? '/'}
    className={cx(
      'flex items-center gap-x-3 p-4 font-body transition-colors duration-500 ease-in-out focus:outline-none',
      btnStyles
    )}
  >
    {children}
  </Link>);
}

export default LinkButton;
