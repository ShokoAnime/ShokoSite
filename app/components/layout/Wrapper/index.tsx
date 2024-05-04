import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/overlayscrollbars.css';

export const Layout = ({ children }) => {
  return (
    <OverlayScrollbarsComponent
      className="os-theme-dark scrollbar-custom"
      options={{
        scrollbars: {
          autoHide: 'scroll',
          visibility: 'auto',
          autoHideDelay: 500,
        },
      }}
      style={{ height: '100vh' }}
    >
      <div>{children}</div>
    </OverlayScrollbarsComponent>
  );
};
