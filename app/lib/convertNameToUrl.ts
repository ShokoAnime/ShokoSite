export const convertNameToUrl = (path: string) => {
  return path
    .replace(/ /g, '-')
    .replace('.md', '')
    .toLowerCase();
};
