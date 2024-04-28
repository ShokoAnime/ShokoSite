import { ReactNode } from 'react';

type ButtonProps = {
  type: 'primary' | 'secondary' | 'outline';
  children: ReactNode;
  className?: string;
  id?: string;
  onClick?: () => void;
};

function Button({ type, className, id, children, onClick }: ButtonProps) {
  const buttonStyle = {
    primary:
      'rounded-lg bg-link-light text-textAlt-light dark:bg-link-dark dark:text-textAlt-dark hover:bg-linkHover-light hover:dark:bg-linkHover-dark',
    secondary: 'border rounded-full bg-backgroundNorm-light border-border-light dark:bg-backgroundNorm-dark dark:border-border-dark',
    outline:
      'border-2 rounded-lg border-link-light text-textHeader-light dark:border-link-dark dark:text-textHeader-dark hover:border-linkHover-light hover:dark:border-linkHover-dark',
  };

  return (
    <button id={id} className={`flex items-center gap-x-3 p-3 ${buttonStyle[type]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
