export const urlFormatProper = (path: string) => {
  return path
    .replace('/downloads/', '')
    .replace(/-/g, ' ')
    .replace(/\/$/, '')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const urlFormatURL = (path: string) => {
  return path
    .replace(/ /g, '-')
    .replace(/\/$/, '')
    .toLowerCase();
};
