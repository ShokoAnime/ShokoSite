import { DownloadsDataType } from '~/types/DownloadsDataType';

const ShokoServer: DownloadsDataType[] = [
  {
    name: 'Shoko Server',
    description:
      'Shoko Server is the central component of the Shoko Suite, designed to manage and organize your anime collection effectively. It\'s highly customizable and can be set up in just a few minutes, making it both user-friendly and efficient. Shoko Server performs the bulk of data processing, managing extensive metadata, and media files, which enables you to enjoy your collection with minimal effort.',
    images: [
      {
        url: '/images/downloads/programs-plugins/WebUI-Index.png',
        alt: 'WebUI Index',
      },
      {
        url: '/images/downloads/programs-plugins/WebUI-Import-Folders.png',
        alt: 'WebUI Import Folders',
      },
      {
        url: '/images/downloads/programs-plugins/WebUI-Actions.png',
        alt: 'WebUI Actions',
      },
      {
        url: '/images/downloads/programs-plugins/WebUI-Settings.png',
        alt: 'WebUI Settings',
      },
      {
        url: '/images/downloads/programs-plugins/WebUI-Settings-02.png',
        alt: 'WebUI Settings 02',
      },
    ],
    resources: [
      {
        name: 'Discord',
        url: 'https://discord.gg/vpeHDsg',
      },
      {
        name: 'Docs',
        url: 'https://docs.shokoanime.com/',
      },
      {
        name: 'Changelog',
        url: 'https://docs.shokoanime.com/changelog/server',
      },
      {
        name: 'Github',
        url: 'https://github.com/ShokoAnime/ShokoServer',
      },
    ],
    downloads: [
      {
        text: 'Windows',
        links: [
          {
            name: 'Windows - Stable',
            version: '4.2.2',
            date: 'April 2nd, 2023',
            url: 'https://shokoanime.com/files/shoko-server/ShokoServer-4.2.2-Win.ex',
          },
          {
            name: 'Windows - Daily',
            version: 'Daily Build',
            url: 'https://shokoanime.com/files/shoko-server/daily/ShokoServer.zip',
          },
        ],
      },
      {
        text: 'Linux',
        links: [
          {
            name: 'Linux - Stable',
            version: '4.2.2',
            date: 'April 2nd, 2023',
            url: 'https://hub.docker.com/r/shokoanime/server/tags?page=1&ordering=last_updated&name=latest',
          },
          {
            name: 'Linux - Daily',
            version: 'Daily Build',
            url: 'https://hub.docker.com/r/shokoanime/server/tags?page=1&ordering=last_updated&name=daily',
          },
        ],
      },
      {
        text: 'Arm64',
        links: [
          {
            name: 'Arm64 - Stable',
            version: '4.2.2',
            date: 'April 2nd, 2023',
            url: 'https://hub.docker.com/r/shokoanime/server/tags?page=1&ordering=last_updated&name=latest-arm64',
          },
          {
            name: 'Arm64 - Daily',
            version: 'Daily Build',
            url: 'https://hub.docker.com/r/shokoanime/server/tags?page=1&ordering=last_updated&name=daily-arm64',
          },
        ],
      },
    ],
  },
];

export default ShokoServer;
