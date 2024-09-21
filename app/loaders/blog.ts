import { Frontmatter, MarkdownFile } from '~/types/markdown';
import { sanitizeContent } from '~/helpers/helpers';

export default async function(): Promise<MarkdownFile[]> {
  const modules = import.meta.glob<{ default: string, frontmatter: Frontmatter }>('../content/posts/*.mdx', {
    eager: false,
  });

  return Promise.all(
    Object.entries(modules).map(async ([filename, moduleLoader]) => {
      const { default: MDContent, frontmatter } = await moduleLoader();
      return {
        filename,
        frontmatter,
        description: sanitizeContent(MDContent),
      };
    }),
  );
}
