import { ReactNode } from 'react';

type ButtonProps = {
  buttonType: 'primary' | 'secondary' | 'outline' | 'padded' | 'resource' | 'text';
  children: ReactNode;
  className?: string;
  id?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Button = ({ buttonType, className, id, children, onClick }: ButtonProps) => {
  const buttonStyle = {
    primary:
      'rounded-lg bg-link-light text-textAlt-light dark:bg-link-dark dark:text-textAlt-dark hover:bg-linkHover-light hover:dark:bg-linkHover-dark',
    secondary:
      'border rounded-full bg-backgroundNorm-light border-border-light dark:bg-backgroundNorm-dark dark:border-border-dark',
    outline:
      'border-2 rounded-lg border-link-light text-textHeader-light dark:border-link-dark hover:text-textAlt-light dark:text-textAlt-dark hover:bg-linkHover-light hover:dark:bg-linkHover-dark',
    padded:
      'rounded-lg text-textHeader-light dark:text-textHeader-dark hover:bg-link-light hover:bg-link-dark hover:text-textAlt-light hover:dark:text-textAlt-dark',
    resource:
      'rounded-lg bg-backgroundAlt-light dark:bg-backgroundAlt-dark text-textHeader-light dark:text-textHeader-dark hover:text-textAlt-light hover:bg-linkHover-light hover:dark:bg-linkHover-dark',
    text: 'text-textHeader-light dark:text-textHeader-dark hover:text-link-light hover:dark:text-link-dark',
  };

  return (
    <button
      type="button"
      id={id}
      className={`flex items-center gap-x-3 p-3 font-medium transition-all duration-500 ease-in-out `
        + `${buttonStyle[buttonType]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
