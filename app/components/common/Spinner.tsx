type SpinnerProps = {
  className?: string;
};

const Spinner = ({ className = '' }: SpinnerProps) => (
  <div
    role="status"
    aria-label="Loading"
    className={`size-20 animate-spin rounded-full border-4 border-shoko-divider border-t-shoko-link ${className}`}
  />
);

export default Spinner;
