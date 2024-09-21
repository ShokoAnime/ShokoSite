import { Frontmatter, MarkdownFile } from '~/types/markdown';
import { sanitizeContent } from './helpers';

const contentTypes = {
  blog: import.meta.glob<{ default: string, frontmatter: Frontmatter }>('../content/posts/*.mdx', { eager: false }),
  blogPost: import.meta.glob<{ default: string, frontmatter: Frontmatter }>('../content/posts/*.mdx', { eager: false }),
  downloads: import.meta.glob<{ default: string, frontmatter: Frontmatter }>('../content/downloads/*/*.mdx', {
    eager: false,
  }),
  downloadSingle: import.meta.glob<{ default: string, frontmatter: Frontmatter }>('../content/downloads/*/*.mdx', {
    eager: false,
  }),
  mediaPlayerPlugins: import.meta.glob<{ default: string, frontmatter: Frontmatter }>(
    '../content/downloads/media-player-plugins/*.mdx',
    {
      eager: false,
    },
  ),
  webuiThemes: import.meta.glob<{ default: string, frontmatter: Frontmatter }>(
    '../content/downloads/webui-themes/*.mdx',
    {
      eager: false,
    },
  ),
  renamerPlugins: import.meta.glob<{ default: string, frontmatter: Frontmatter }>(
    '../content/downloads/renamer-plugins/*.mdx',
    {
      eager: false,
    },
  ),
  legacyApps: import.meta.glob<{ default: string, frontmatter: Frontmatter }>(
    '../content/downloads/legacy-apps/*.mdx',
    {
      eager: false,
    },
  ),
};

export async function loadMarkdownFiles(type: string): Promise<MarkdownFile[]> {
  const modules = contentTypes[type as keyof typeof contentTypes];
  const dontSanitize = ['blogPost', 'downloadSingle'];

  if (!modules) {
    throw new Error(`Invalid content type: ${type}`);
  }

  return await Promise.all(
    Object.entries(modules).map(async ([filename, moduleLoader]) => {
      const { default: MDContent, frontmatter } = await moduleLoader();
      return {
        filename,
        frontmatter,
        description: dontSanitize.includes(type) ? <MDContent /> : sanitizeContent(MDContent),
      };
    }),
  );
}
