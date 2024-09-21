type SectionHeaderProps = {
  title: string;
  type: 'h2' | 'h4';
  subtitle?: string;
  center?: boolean;
  className?: string;
};

const SectionHeader = ({ title, subtitle, type, center, className }: SectionHeaderProps) => {
  return (
    <div className={`flex flex-col ${center === true ? 'items-center ' : 'items-start'}`}>
      {subtitle && <div className="font-header text-shoko-18 font-semibold text-shoko-text-75">{subtitle}</div>}
      {type === 'h2' ? <h2 className={className}>{title}</h2> : <h4 className={className}>{title}</h4>}
      <hr className="mt-3 w-[120px] border border-shoko-highlight" />
    </div>
  );
};

export default SectionHeader;
