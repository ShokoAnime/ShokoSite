import SectionHeader from '~/components/common/SectionHeader';
import { ExternalLink } from 'lucide-react';
import { SingleMediaPlayerProps } from '~/types/home';
import { Link } from '@remix-run/react';

const mediaPlayers = [
  {
    program: 'plex',
    name: 'Shoko Metadata | ShokoRelay',
    type: 'Plex Agent & Scanner',
    link: '/downloads/media-player-plugins',
  },
  {
    program: 'Jellyfin',
    name: 'Shokofin',
    type: 'Jellyfin Plugin',
    link: '/downloads/media-player-plugins/shokofin',
  },
  {
    program: 'Kodi',
    name: 'Nakamori | Shokodi',
    type: 'Kodi Plugin',
    link: '/downloads/media-player-plugins',
  },
  {
    program: 'MediaPortal',
    name: 'My Anime 3',
    type: 'MediaPortal 1 Plugin',
    link: '/downloads/media-player-plugins/my-anime-3',
  },
];

const SingleMediaPlayer = ({ program, name, type, link }: SingleMediaPlayerProps) => {
  return (
    <Link
      to={link}
      className="flex w-full max-w-[330px] flex-col items-center gap-4 rounded-lg border border-shoko-border bg-shoko-bg-alt p-4 text-center transition-transform duration-300 hover:-translate-y-4 hover:cursor-pointer hover:border-shoko-link hover:text-shoko-text"
      style={{ transformOrigin: 'center', willChange: 'transform', position: 'relative' }}
    >
      <img src={`/images/home/${program.toLowerCase()}.svg`} alt={name} className="size-16" />
      <div className="flex flex-col gap-1">
        <div className="font-header text-shoko-18 font-semibold">{name}</div>
        <div>{type}</div>
      </div>
    </Link>
  );
};

const WatchAnywhere = () => {
  return (
    <div className="flex flex-col gap-16">
      <div className="mx-auto flex max-w-[700px] flex-col justify-center gap-2 text-center">
        <SectionHeader title="Watch Anywhere" type="h2" center={true} />
        <div className="mt-6">
          Shoko goes beyond automated collection management by supporting a variety of media players, allowing you to
          watch your anime on the device of your choice, wherever you are.
        </div>
        <div className="flex items-center justify-center gap-2 text-center text-shoko-link">
          <a href="google.com" rel="noopener noreferrer" target="_blank">
            Learn how to bring Shoko to your preferred media player.
          </a>
          <ExternalLink size={20} />
        </div>
      </div>
      <div className="flex gap-6">
        {mediaPlayers.map((data) => (
          <SingleMediaPlayer
            key={data.program}
            program={data.program}
            name={data.name}
            type={data.type}
            link={data.link}
          />
        ))}
      </div>
    </div>
  );
};

export default WatchAnywhere;
