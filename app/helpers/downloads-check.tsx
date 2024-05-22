import MediaPlayerPlugins from '~/data/media-player-plugins';
import ShokoServer from '~/data/shoko-server';

export const downloadsCheck = (id: string) => {
  if (id === 'media-player-plugins') {
    return MediaPlayerPlugins;
  }

  if (id === 'shoko-server') {
    return ShokoServer;
  }
};
