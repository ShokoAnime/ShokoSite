import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface DownloadCalloutProps {
  icon: IconProp;
  message: React.ReactNode;
}

export const DownloadCallout = ({ icon, message }: DownloadCalloutProps) => {
  return (
    <div className="flex items-center gap-x-4 rounded-lg bg-backgroundAlt-light p-6 font-medium dark:bg-backgroundAlt-dark">
      <FontAwesomeIcon className="text-highlight-light dark:text-highlight-dark" icon={icon} size="lg" />
      <div>{message}</div>
    </div>
  );
};
