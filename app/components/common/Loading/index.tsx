export const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center">
        <img src="/images/shoko-icon.svg" alt="Shoko" className="h-32 animate-bounce" />
        <h4 className="mt-4 font-semibold">Loading...</h4>
      </div>
    </div>
  );
};
