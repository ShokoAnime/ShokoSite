import { HistorySectionProps } from '~/types/common';
import SectionHeader from '~/components/common/SectionHeader';

const HistorySection = ({ title, years, programs, children }: HistorySectionProps) => {
  return (
    <div className="mx-auto flex max-w-[73.75rem] flex-col gap-x-16 lg:flex-row">
      <div className="flex w-full flex-col items-center gap-y-6 lg:max-w-[11.75rem]">
        <SectionHeader title={title} subtitle={years} type="h4" center={true} className="!text-3xl" />
        <div className="mb-6 flex w-full flex-wrap items-center justify-center gap-2 border-b border-solid border-shoko-border pb-6 font-medium text-shoko-text-header lg:flex-col lg:border-0">
          {programs.map((program) => <div key={program}>{program}</div>)}
        </div>
      </div>
      <hr className="h-auto w-px border border-shoko-border" />
      <div className="flex max-w-[53.125rem] flex-col gap-y-8">{children}</div>
    </div>
  );
};

export default HistorySection;
