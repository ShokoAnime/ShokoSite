import { renderToStaticMarkup } from 'react-dom/server';

export const convertToProperName = (path: string) => {
  if (path === undefined) {
    return path;
  }

  return path
    .replace(/\b(\d+)-(\d+)-(\d+)\b/g, (match, p1, p2, p3) => {
      return `${p1}.${p2}.${p3}`;
    })
    .replace(/\b(\d+)-(\d+)-(\d+)-(\d+)\b/g, (match, p1, p2, p3, p4) => {
      return `${p1}.${p2}.${p3}.${p4}`;
    })
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\bDownloadsIndex\b/g, 'Downloads')
    .replace(/\bUi\b/g, 'UI')
    .replace(/\bJmm\b/g, 'JMM');
};

export const convertNameToUrl = (path: string) => {
  return path
    .replace(/ /g, '-')
    .replace('.md', '')
    .toLowerCase();
};

export const convertDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-US', options);
};

export const sanitizeContent = (MDContent: string): string => {
  const renderedContent = renderToStaticMarkup(<MDContent />);
  return renderedContent
    .replace(/<[^>]*>|&[^;]+;/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .slice(0, 100)
    .join(' ');
};
