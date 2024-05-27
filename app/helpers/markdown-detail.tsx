import { markdownTypes } from '~/helpers/markdown-types';

export const markdownDetail = (path: string) => {
  const type = path.split('/').length === 3 ? path.split('/')[1] : path.split('/')[2];
  const fileName = path.split('/').length === 3 ? path.split('/')[2] : path.split('/')[3];
  const modules = markdownTypes(type);

  const files = Object.keys(modules).map((filename: string) => {
    const module = modules[filename];
    const MDContent = module.default;

    return {
      filename: filename.split('/').length === 3
        ? filename.split('/')[3].replace('.md', '')
        : filename.split('/')[4].replace('.md', ''),
      frontmatter: module.frontmatter,
      description: <MDContent />,
    };
  });

  return files.filter((file) => file.filename === fileName)[0];
};
