import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/overlayscrollbars.css';
import { ScrollWrapperProps } from '~/types/common';

const ScrollWrapper = ({ children }: ScrollWrapperProps) => {
  return (
    <OverlayScrollbarsComponent
      defer
      className="os-theme-dark scrollbar-custom"
      style={{ height: '100vh' }}
      options={{
        scrollbars: {
          autoHide: 'scroll',
          visibility: 'auto',
          autoHideDelay: 500,
        },
      }}
    >
      <div>{children}</div>
    </OverlayScrollbarsComponent>
  );
};

export default ScrollWrapper;
