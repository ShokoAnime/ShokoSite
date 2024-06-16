export const PageNotFound = () => {
  return (
    <>
      <div className="flex min-h-[calc(100vh-197px)] items-center justify-center pb-32">
        <div className="flex flex-col gap-y-8 text-center">
          <h2 className="text-[20vw] leading-none">404</h2>
          <div className="flex flex-col gap-y-4 text-2xl">
            <div className="">Something went wrong, and you broke the site.</div>
            <div className="">
              Feel free to let <span className="text-shoko-highlight">Elemental Crisis</span> know about it on{' '}
              <a className="text-shoko-link hover:text-shoko-link-hover" href="https://discord.com/">Discord</a>.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
