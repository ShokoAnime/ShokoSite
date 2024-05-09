const mediaPlayers = [
  { name: 'Nakamori | Shokodi', mediaPlayer: 'Kodi Plugin', image: '/images/home/kodi.svg' },
  { name: 'Shoko Metadata | ShokoRelay', mediaPlayer: 'Plex Agent & Scanner', image: '/images/home/plex.svg' },
  { name: 'My Anime 3', mediaPlayer: 'MediaPortal 1 Plugin', image: '/images/home/media-portal.svg' },
  { name: 'Shokofin', mediaPlayer: 'Jellyfin Plugin', image: '/images/home/jellyfin.svg' },
];

const InfoGroupDetails = [
  {
    title: 'Collection Management Made Easy',
    image: '/images/home/video-placeholder.webp',
    content: (
      <>
        <span>
          <span className="text-shoko-highlight font-medium">Shoko</span>{' '}
          is a free, open-source, cross-platform anime collection management system that automates the process of
          organizing your library. It eliminates the need to manually input series information or rename files to
          conform to specific formats for basic series data. Shoko simplifies anime management, making it easier to
          organize and enjoy your collection.
        </span>
        <span>
          Shoko streamlines the process for you, ensuring that your collection is always well-organized, easily
          accessible across multiple devices with one of our many media player plugins, and most importantly,
          automatically maintained.
        </span>
        <span className="text-shoko-highlight font-medium">
          It&apos;s important to note that Shoko does not offer any means to download files, stream files from streaming
          sites, or access files that are not part of your personal collection.
        </span>
      </>
    ),
  },
  {
    title: 'Spend More Time Watching Anime',
    image: '/images/home/video-placeholder.webp',
    content: (
      <>
        <span>
          With Shoko, you can have your anime collection up and running within just five minutes. Shoko automatically
          populates your database with information about the various series and episodes in your collection by hashing
          each file for comparison against{' '}
          <a
            className="text-shoko-link font-medium underline"
            href="https://anidb.net"
            target="_blank"
            rel="noreferrer"
          >
            AniDB&apos;s
          </a>{' '}
          extensive database. Shoko also utilizes additional metadata sources to provide even more information and
          integration, ensuring that your collection is complete and well-organized.
        </span>
        <span>
          Once your collection is set up, all that&apos;s left for you to do is decide which series you want to watch.
        </span>
      </>
    ),
  },
  {
    title: 'Media Player Support',
    image: '/images/home/video-placeholder.webp',
    content: (
      <>
        <span>
          Shoko offers more than just automated collection management. It also supports a wide range of media players,
          allowing you to watch your collection on the device of your choice anywhere you’d like.
        </span>
        <div className="mt-4 grid grid-cols-2 grid-rows-2 gap-y-8">
          {mediaPlayers.map((data) => (
            <div key={data.name} className="flex items-center gap-x-4">
              <img width={60} height={60} src={data.image} alt={data.name} />
              <div className="flex flex-col">
                <span className="text-shoko-text-header font-medium">
                  {data.name}
                </span>
                <span>{data.mediaPlayer}</span>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
];

export default InfoGroupDetails;
