import { renderToStaticMarkup } from 'react-dom/server';
import { markdownTypes } from '~/helpers/markdown-types';

export const markdownList = (path: string) => {
  const modules = markdownTypes(path);

  // Removes HTML tags, entities, extra whitespace and line breaks from MDX content
  const sanitizeContent = (MDContent: string) => {
    const renderedContent = renderToStaticMarkup(<MDContent />);
    const cleanedContent = renderedContent.replace(/<[^>]*>|&[^;]+;/g, '');
    return cleanedContent.replace(/\s+/g, ' ').trim();
  };

  return Object.keys(modules).map((filename: string) => {
    const module = modules[filename];
    const MDContent = module.default;
    const sanitizedContent = sanitizeContent(MDContent);

    return {
      filename,
      frontmatter: module.frontmatter,
      description: sanitizedContent,
    };
  });
};
