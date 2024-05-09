import React from 'react';

type IconProps = {
  icon: React.ReactNode | string;
  size?: number;
  className?: string;
};

const Icon = ({ className, icon, size = 24 }: IconProps) => {
  if (typeof icon !== 'string') {
    return icon;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      style={{ width: size, height: size }}
    >
      <path fill="currentColor" d={icon} />
    </svg>
  );
};

export default Icon;
