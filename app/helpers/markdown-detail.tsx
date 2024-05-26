import { markdownTypes } from '~/helpers/markdown-types';

export const markdownDetail = (path: string) => {
  const type = path.split('/')[1];
  const postName = path.split('/')[2];
  const modules = markdownTypes(type);

  const files = Object.keys(modules).map((filename: string) => {
    const module = modules[filename];
    const MDContent = module.default;

    return {
      postName: filename.split('/')[3].replace('.md', ''),
      frontmatter: module.frontmatter,
      description: <MDContent />,
    };
  });

  return files.filter((file) => file.postName === postName)[0];
};
