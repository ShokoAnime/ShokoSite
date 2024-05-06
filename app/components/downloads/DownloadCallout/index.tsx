import React from 'react';
import { Icon } from '~/components';

interface DownloadCalloutProps {
  icon: string;
  message: React.ReactNode;
}

export const DownloadCallout = ({ icon, message }: DownloadCalloutProps) => {
  return (
    <div className="bg-shoko-bg-alt flex items-center gap-x-4 rounded-lg p-6 font-medium">
      <Icon className="text-shoko-highlight" icon={icon} size={24} />
      <div>{message}</div>
    </div>
  );
};
