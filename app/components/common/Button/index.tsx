import { ReactNode } from 'react';

type ButtonProps = {
  buttonType: 'primary' | 'secondary' | 'outline' | 'padded';
  children: ReactNode;
  className?: string;
  id?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Button = ({ buttonType, className, id, children, onClick }: ButtonProps) => {
  const buttonStyle = {
    primary:
      'rounded-lg bg-link-light text-textAlt-light dark:bg-link-dark dark:text-textAlt-dark hover:bg-linkHover-light hover:dark:bg-linkHover-dark',
    secondary: 'border rounded-full bg-backgroundNorm-light border-border-light dark:bg-backgroundNorm-dark dark:border-border-dark',
    outline:
      'border-2 rounded-lg border-link-light text-textHeader-light dark:border-link-dark dark:text-textHeader-dark hover:border-linkHover-light hover:dark:border-linkHover-dark',
    padded:
      'rounded-lg text-textHeader-light dark:text-textHeader-dark hover:bg-link-light hover:bg-link-dark hover:text-textAlt-light hover:dark:text-textAlt-dark',
  };

  return (
    <button type='button' id={id} className={`flex items-center gap-x-3 p-3 ${buttonStyle[buttonType]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
