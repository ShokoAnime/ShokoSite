import { ReactNode, useMemo } from 'react';

type ButtonProps = {
  type: 'primary' | 'secondary';
  className?: string;
  children: ReactNode;
};

function Button(props: ButtonProps) {
  const { type, className, children } = props;
  const buttonStyle = useMemo(() => {
    if (type === 'primary') return 'bg-[#3E64ED] text-[#FFFFFF]';
    return 'border-solid border-[#3E64ED] border text-[#2C324B]';
  }, [type]);
  return <button className={`rounded-[0.5rem] p-[0.75rem] ${buttonStyle} ${className}`}>{children}</button>;
}

export default Button;
