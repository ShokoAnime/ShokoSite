import React from 'react';

type HighLightHeaderProps = {
  title: string;
  rightSide?: React.ReactNode;
};

function HighLightHeader({ title, rightSide }: HighLightHeaderProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl">{title}</h2>
        {rightSide}
      </div>
      <hr className="border-shoko-highlight w-[100px] border" />
    </div>
  );
}

export default HighLightHeader;
