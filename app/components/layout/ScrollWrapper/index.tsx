import React from "react";
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/overlayscrollbars.css';

interface ScrollWrapperProps {
    children: React.ReactNode
}

export const ScrollWrapper = ({ children }:ScrollWrapperProps) => {
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
