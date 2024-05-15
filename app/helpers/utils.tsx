export const convertToProperName = (path: string) => {
  return path
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace('Ui', 'UI');
};

export const convertNameToUrl = (path: string) => {
  return path
    .replace(/ /g, '-')
    .toLowerCase();
};
