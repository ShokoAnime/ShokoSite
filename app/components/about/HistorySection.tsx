import SectionHeader from '~/components/common/SectionHeader';

type HistorySectionProps = {
  title: string;
  years: string;
  programs: string[];
  children: React.ReactNode;
};

const HistorySection = ({ title, years, programs, children }: HistorySectionProps) => {
  return (
    <div className="mx-auto mb-16 flex flex-col gap-16 lg:flex-row">
      <div className="flex w-full max-w-[175px] flex-col items-center gap-6">
        <SectionHeader title={title} subtitle={years} type="h4" center={true} />
        <div className="flex w-full flex-col flex-wrap items-center justify-center gap-2 font-semibold text-shoko-text">
          {programs.map((program) => <div key={program}>{program}</div>)}
        </div>
      </div>
      <hr className="h-auto w-px border border-shoko-divider" />
      <div className="flex max-w-[850px] flex-col gap-8">{children}</div>
    </div>
  );
};

export default HistorySection;
