import path from 'path';

export const contentPath = (CONTENT_DIR: string, type: string) => {
  const contentPaths: Record<string, string> = {
    blog: path.join(CONTENT_DIR, 'posts'),
    downloads: path.join(CONTENT_DIR, 'downloads'),
    'shoko-server': path.join(CONTENT_DIR, 'downloads', 'shoko-server'),
    'media-player-plugins': path.join(CONTENT_DIR, 'downloads', 'media-player-plugins'),
    'webui-themes': path.join(CONTENT_DIR, 'downloads', 'webui-themes'),
    'renamer-plugins': path.join(CONTENT_DIR, 'downloads', 'renamer-plugins'),
    'legacy-apps': path.join(CONTENT_DIR, 'downloads', 'legacy-apps'),
  };

  if (!(type in contentPaths)) {
    throw new Error(`Invalid content type: ${type}`);
  }

  return contentPaths[type];
};
