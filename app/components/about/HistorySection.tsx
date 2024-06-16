import { SectionHeader } from '~/components/common/SectionHeader';
import { HistorySectionProps } from '~/types/common';

export const HistorySection = ({ title, years, programs, children }: HistorySectionProps) => {
  return (
    <div className="mx-auto flex max-w-[73.75rem] gap-x-16">
      <div className="flex w-full max-w-[11.75rem] flex-col items-center gap-y-6">
        <SectionHeader title={title} subtitle={years} type="h4" center={true} />
        <div className="text-shoko-text-header flex flex-col items-center gap-y-2 font-medium">
          {programs.map((program) => <div key={program}>{program}</div>)}
        </div>
      </div>
      <hr className="border-shoko-border h-auto w-px border" />
      <div className="flex max-w-[53.125rem] flex-col gap-y-8">{children}</div>
    </div>
  );
};

export default HistorySection;
