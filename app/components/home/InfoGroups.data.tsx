const mediaPlayers = [
  { name: 'Nakamori | Shokodi', mediaPlayer: 'Kodi Plugin', image: '/images/home/kodi.svg' },
  { name: 'Shoko Metadata | ShokoRelay', mediaPlayer: 'Plex Agent & Scanner', image: '/images/home/plex.svg' },
  { name: 'My Anime 3', mediaPlayer: 'MediaPortal 1 Plugin', image: '/images/home/media-portal.svg' },
  { name: 'Shokofin', mediaPlayer: 'Jellyfin Plugin', image: '/images/home/jellyfin.svg' },
];

const InfoGroupDetails = [
  {
    title: 'Collection Management Made Easy',
    subtitle: 'Let Shoko Take Control',
    image: '/images/home/web-ui-dashboard.webp',
    content: (
      <>
        <div>
          Shoko is a free, open-source, and cross-platform anime collection management system that automates organizing
          your collection, regardless of size or location. It eliminates the need for manual input of series information
          or file renaming, ensuring your collection is well-organized and accessible across multiple devices with media
          player plugins.
        </div>
        <div className="text-shoko-highlight font-medium">
          Please be aware that Shoko does not offer any means to download files, stream files from streaming sites, or
          access files that are not part of your personal collection.
        </div>
      </>
    ),
  },
  {
    title: 'Spend More Time Watching Anime',
    subtitle: 'Get Started In Minutes',
    image: '/images/home/web-ui-series.webp',
    content: (
      <>
        <div>
          With Shoko, you can have your anime collection up and running in just five minutes. Shoko automatically
          populates your database with detailed information about the series and episodes in your collection by hashing
          each file and comparing it against{' '}
          <a
            className="text-shoko-link underline"
            href="https://anidb.net"
            target="_blank"
            rel="noreferrer"
          >
            AniDB&apos;s
          </a>{' '}
          extensive database. Additionally, Shoko uses various metadata sources to provide even more information and
          integration, ensuring your collection is complete and well-organized. Once your collection is set up, all
          that&apos;s left for you to do is decide which series to watch next.
        </div>
      </>
    ),
  },
  {
    title: 'Media Player Support',
    subtitle: 'Watch Your Way',
    image: '/images/home/media-player.webp',
    content: (
      <>
        <div>
          Shoko offers more than just automated collection management. It supports a wide range of media players,
          allowing you to watch your collection on thefk device of your choice, wherever you’d like.
        </div>
        <div className="mt-4 grid grid-cols-2 grid-rows-2 gap-y-8">
          {mediaPlayers.map((data) => (
            <div key={data.name} className="flex items-center gap-x-4">
              <img width={60} height={60} src={data.image} alt={data.name} />
              <div className="flex flex-col">
                <div className="text-shoko-text-header font-header text-lg font-semibold">
                  {data.name}
                </div>
                <div>{data.mediaPlayer}</div>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
];

export default InfoGroupDetails;
