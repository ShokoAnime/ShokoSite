import SectionHeader from '~/components/common/SectionHeader';

type HistorySectionProps = {
  title: string;
  years: string;
  programs: string[];
  children: React.ReactNode;
};

const HistorySection = ({ title, years, programs, children }: HistorySectionProps) => {
  return (
    <div className="mx-auto mb-8 flex flex-col gap-8 lg:mb-16 lg:flex-row lg:gap-16">
      <div className="flex w-full flex-col items-center gap-6 lg:max-w-[176px]">
        <SectionHeader title={title} subtitle={years} type="h4" center={true} />
        <div className="flex w-full flex-row flex-wrap items-center justify-center gap-4 font-semibold text-shoko-text lg:flex-col lg:gap-2">
          {programs.map((program) => <div key={program}>{program}</div>)}
        </div>
      </div>
      <hr className="size-auto border  border-shoko-divider" />
      <div className="flex max-w-[850px] flex-col gap-8 text-start">{children}</div>
    </div>
  );
};

export default HistorySection;
