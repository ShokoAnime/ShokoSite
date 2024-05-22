import { DownloadsDataType } from '~/types/DownloadsDataType';

const MediaPlayerPlugins: DownloadsDataType[] = [
  {
    name: 'Shoko Metadata',
    description:
      'Shoko Metadata provides users with a smooth anime experience on Plex pulling your series data directly from Shoko instead of the default metadata sources Plex uses. This Plex library plugin provides support for TV Series and Movies.',
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
        name: 'Github',
        url: 'https://github.com/Cazzar/ShokoMetadata.bundle',
      },
      {
        name: 'Docs',
        url: 'https://docs.shokoanime.com/',
      },
      {
        name: 'Changelog',
        url: 'https://docs.shokoanime.com/changelog/shokometadata/',
      },
      {
        name: 'Discord',
        url: 'https://discord.gg/vpeHDsg',
      },
    ],
    downloads: [
      {
        text: 'Plex',
        links: [
          {
            name: 'Plex Stable',
            version: '1.5.1',
            date: 'March 24th, 2022',
            url: 'https://github.com/Cazzar/ShokoMetadata.bundle/releases/',
          },
        ],
      },
    ],
  },
  {
    name: 'Shoko Relay',
    description:
      'ShokoRelay is an agent/scanner that allows you to combine your series and movies into a single library while using Shoko to manage it.',
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
        name: 'Github',
        url: 'https://github.com/natyusha/ShokoRelay.bundle/',
      },
      {
        name: 'Discord',
        url: 'https://discord.gg/vpeHDsg',
      },
    ],
    downloads: [
      {
        text: 'Plex',
        links: [
          {
            name: 'Plex Stable',
            version: '1.0.1',
            date: 'March 27th, 2024',
            url: 'https://github.com/natyusha/ShokoRelay.bundle/releases',
          },
        ],
      },
    ],
  },
  {
    name: 'Nakamori',
    description:
      'Nakamori provides users with a seamless integrated service that utilizes the full power of Shoko to make your anime watching experience second to none.',
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
        name: 'Github',
        url: 'https://github.com/bigretromike/nakamori/',
      },
      {
        name: 'Docs',
        url: 'https://shokunin.monogatari.pl/nakamori/',
      },
      {
        name: 'Changelog',
        url: 'https://github.com/bigretromike/nakamori.plugin/blob/master/changelog.txt',
      },
      {
        name: 'Discord',
        url: 'https://discord.gg/vpeHDsg',
      },
    ],
    downloads: [
      {
        text: 'Kodi',
        links: [
          {
            name: 'Kodi Stable',
            version: '4.1.2',
            date: 'June 4th, 2022',
            url: 'https://github.com/bigretromike/nakamori/releases',
          },
        ],
      },
    ],
  },
  {
    name: 'Shokofin',
    description:
      'Shokofin brings your entire collection to Jellyfin leveraging the power of Shoko and the easiness of Jellyfin.',
    images: [
      {
        url: 'http://shokoanime.com/assets/images/programs-plugins/shokofin/Shokofin-Series-Listing-01.jpg',
        alt: 'Shokofin Series Listing',
      },
    ],
    resources: [
      {
        name: 'Github',
        url: 'https://github.com/ShokoAnime/Shokofin',
      },
      {
        name: 'Docs',
        url: 'https://docs.shokoanime.com/',
      },
      {
        name: 'Changelog',
        url: 'https://docs.shokoanime.com/changelog/shokofin/',
      },
      {
        name: 'Discord',
        url: 'https://discord.gg/vpeHDsg',
      },
    ],
    downloads: [
      {
        text: 'Jellyfin',
        links: [
          {
            name: 'Jellyfin Stable',
            version: '3.0.0',
            date: 'March 29th, 2023',
            url: 'https://github.com/ShokoAnime/Shokofin/releases/',
          },
        ],
      },
    ],
  },
  {
    name: 'My Anime 3',
    description:
      'My Anime 3 delivers your entire anime collection in all its glory straight to Media Portal providing users with the ultimate TV viewing experience.',
    images: [
      {
        url:
          'http://shokoanime.com/assets/images/programs-plugins/my-anime-3/My-Anime-3-StreamedMP-Collection-List.jpg',
        alt: 'My Anime 3 StreamedMP Collection List',
      },
    ],
    resources: [
      {
        name: 'Github',
        url: 'https://github.com/ShokoAnime/MyAnime3',
      },
      {
        name: 'Docs',
        url: 'https://docs.shokoanime.com/',
      },
      {
        name: 'Changelog',
        url: 'https://docs.shokoanime.com/changelog/myanime3/',
      },
      {
        name: 'Discord',
        url: 'https://discord.gg/vpeHDsg',
      },
    ],
    downloads: [
      {
        text: 'Media Portal',
        links: [
          {
            name: 'Media Portal Stable',
            version: '3.7.3',
            date: 'November 17th, 2019',
            url: 'https://shokoanime.com/files/my-anime-3/My-Anime-3-3.7.3.mpe1',
          },
        ],
      },
    ],
  },
];

export default MediaPlayerPlugins;
