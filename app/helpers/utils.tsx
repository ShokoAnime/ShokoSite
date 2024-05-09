export const convertPathToBreadcrumb = (path: string) => {
  return path
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const convertNameToUrl = (path: string) => {
  return path
    .replace(/ /g, '-')
    .toLowerCase();
};
