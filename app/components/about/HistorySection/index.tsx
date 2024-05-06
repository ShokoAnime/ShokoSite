import React from 'react';

interface HistorySectionProps {
  title: string;
  years: string;
  programs: string[];
  children: React.ReactNode;
}

export const HistorySection = ({ title, years, programs, children }: HistorySectionProps) => {
  return (
    <div className="mx-auto flex max-w-[73.75rem] gap-x-16">
      <div className="flex w-full max-w-[11.75rem] flex-col items-center gap-y-8">
        <div className="flex flex-col items-center gap-y-2">
          <h4>{title}</h4>
          <div className="text-shoko-text-header font-medium">{years}</div>
        </div>
        <hr className="border-shoko-border w-[6.25rem] border" />
        <div className="text-shoko-text-header flex flex-col items-center gap-y-2 font-medium">
          {programs.map((program) => <div key={program}>{program}</div>)}
        </div>
      </div>
      <hr className="border-shoko-border h-auto w-px border" />
      <div className="flex max-w-[53.125rem] flex-col gap-y-8">{children}</div>
    </div>
  );
};
