export const markdownTypes = (type: string) => {
  let modules: Record<string, { default: string, frontmatter: Record<string, never> }> = {};

  switch (type) {
    case 'blog':
      modules = import.meta.glob<{ default: string, frontmatter: Record<string, never> }>(
        '../content/posts/*.md',
        { eager: true },
      );
      break;
    case 'shoko-server':
    case 'downloads':
      modules = import.meta.glob<{ default: string, frontmatter: Record<string, never> }>(
        '../content/downloads/shoko-server/*.md',
        { eager: true },
      );
      break;
    case 'media-player-plugins':
      modules = import.meta.glob<{ default: string, frontmatter: Record<string, never> }>(
        '../content/downloads/media-player-plugins/*.md',
        { eager: true },
      );
      break;
  }

  return modules;
};
