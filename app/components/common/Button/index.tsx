import { ReactNode, useMemo } from 'react';

type ButtonProps = {
  type: 'primary' | 'secondary' | 'secondary-outline';
  className?: string;
  children: ReactNode;
};

function Button(props: ButtonProps) {
  const { type, className, children } = props;
  const buttonStyle = useMemo(() => {
    if (type === 'primary') return 'bg-[#3E64ED] text-[#FFFFFF]';
    if (type === 'secondary-outline') return 'border-solid border-[#3E64ED] border text-[#2C324B]';
    return 'border-solid border bg-[#FDFCFF] text-[#2C324B] border-[#BAC8D7]';
  }, [type]);
  return <button className={`rounded-[0.5rem] p-[0.75rem] ${buttonStyle} ${className}`}>{children}</button>;
}

export default Button;
