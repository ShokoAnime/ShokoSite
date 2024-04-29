import { faBezierCurve, faDatabase, faEye, faFilePen, faLaptopCode, faTv } from '@fortawesome/free-solid-svg-icons';

export const benefitsMap = [
  {
    title: 'Hash-Based Matching',
    description: 'Hash and compare files with AniDB for accurate episode and series identification.',
    icon: faDatabase,
  },
  {
    title: 'File Management',
    description: 'Manage multiple, duplicate, and missing files with Shoko\'s built-in utilities',
    icon: faFilePen,
  },
  {
    title: 'Sync watch States',
    description: 'Automatically sync and update watch states for local and supported community sites.',
    icon: faEye,
  },
  {
    title: 'Metadata Support',
    description: 'Acquire data and images from multiple metadata sites to improve your collections.',
    icon: faBezierCurve,
  },
  {
    title: 'Media Player Support',
    description: 'Integrate with multiple media players for on-the-go access to your collection.',
    icon: faTv,
  },
  {
    title: 'Extensive API',
    description: 'Expand Shoko\'s capabilities, customize it or bring it to an entirely new platform.',
    icon: faLaptopCode,
  },
];
