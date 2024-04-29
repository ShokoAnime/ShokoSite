import React from 'react';

interface InfoGroupProps {
  title: string;
  content: React.ReactNode;
  image: string;
  reverse?: boolean;
}

export const InfoGroup = ({ title, content, image, reverse = false }: InfoGroupProps) => {
  return (
    <>
      {/* Only shown when min-width <= 1280 */}
      <div className="inline-flex max-w-[850px] flex-col gap-y-2 2xl:hidden">
        <h2>{title}</h2>
        <hr className="mx-auto flex w-[100px] border border-highlight-light dark:border-highlight-dark" />
      </div>
      <div
        className={`flex items-center gap-x-16 ${reverse ? 'flex-row-reverse' : ''}`}
      >
        <div className="flex max-w-[850px] flex-col gap-y-8">
          <div className="hidden flex-col gap-y-2 2xl:inline-flex">
            <h2>{title}</h2>
            <hr className="w-[100px] border border-highlight-light dark:border-highlight-dark" />
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col gap-4">{content}</div>
          </div>
        </div>
        <img src={image} alt={title} width={611} />
      </div>
    </>
  );
};
