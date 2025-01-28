const Footer = () => {
  return (
    <footer className="relative flex items-center justify-center bg-shoko-bg-alt">
      <div className="flex w-full max-w-screen-2xl items-center justify-between p-6">
        <div>
          <div>© 2016-2024 Shoko. All rights reserved.</div>
          <div>Images and related content are used for reference and non-commercial purposes.</div>
          <div>All copyrights and trademarks are the property of their respective owners.</div>
        </div>
        <div>
          <div>Powered By</div>
          <a href="https://jb.gg/OpenSourceSupport" rel="noopener noreferrer" target="_blank">
            <img
              className="mt-2 max-w-44"
              src="/images/home/jb-logo.svg"
              alt="Rider logo"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
