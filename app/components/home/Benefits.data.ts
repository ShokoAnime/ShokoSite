import {
  mdiCogs,
  mdiDatabaseClock,
  mdiEyeRefresh,
  mdiFileDocumentEditOutline,
  mdiLinux,
  mdiRename,
  mdiTelevision,
  mdiVectorBezier,
} from '@mdi/js';

const benefitDetails = [
  {
    title: 'Hash-Based Matching',
    description: 'Hash and compare files with AniDB for accurate episode and series identification.',
    icon: mdiDatabaseClock,
  },
  {
    title: 'File Management',
    description: 'Manage multiple, duplicate, and missing files with Shoko\'s built-in utilities',
    icon: mdiFileDocumentEditOutline,
  },
  {
    title: 'Cross Platform',
    description: 'Fully supported on Windows and Linux with experimental support on ARM64 devices. .',
    icon: mdiLinux,
  },
  {
    title: 'Media Player Support',
    description: 'Integrate with multiple media players for on-the-go access to your collection.',
    icon: mdiTelevision,
  },
  {
    title: 'Sync Watch States',
    description: 'Automatically sync and update watch states for local and supported community sites.',
    icon: mdiEyeRefresh,
  },
  {
    title: 'Metadata Support',
    description: 'Acquire data and images from multiple metadata sites to improve your collections.',
    icon: mdiVectorBezier,
  },
  {
    title: 'File Renaming & Moving',
    description: 'Automatically rename and move matched files based on your specific criteria.',
    icon: mdiRename,
  },
  {
    title: 'Extensive API',
    description: 'Expand Shoko\'s capabilities, customize it or bring it to an entirely new platform.',
    icon: mdiCogs,
  },
];

export default benefitDetails;
