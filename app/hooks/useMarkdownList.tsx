import { useMemo } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

export const useMarkdownList = (type: string) => {
  let modules: Record<string, { default: string, frontmatter: string }> = {};

  if (type === 'blog') {
    modules = import.meta.glob<{ default: string, frontmatter: string }>(
      '../content/posts/*.md',
      { eager: true },
    );
  }

  if (type === 'shoko-server') {
    modules = import.meta.glob<{ default: string, frontmatter: string }>(
      '../content/downloads/shoko-server/*.md',
      { eager: true },
    );
  }

  // Removes HTML tags, entities, extra whitespace and line breaks from MDX content
  const sanitizeContent = (MDXContent: string) => {
    const renderedContent = renderToStaticMarkup(<MDXContent />);
    const cleanedContent = renderedContent.replace(/<[^>]*>|&[^;]+;/g, '');
    return cleanedContent.replace(/\s+/g, ' ').trim();
  };

  return useMemo(() => {
    return Object.keys(modules).map((filename: string) => {
      const module = modules[filename];
      const MDXContent = module.default;
      const sanitizedContent = sanitizeContent(MDXContent);

      return {
        filename,
        frontmatter: module.frontmatter,
        content: sanitizedContent,
      };
    });
  }, []);
};
