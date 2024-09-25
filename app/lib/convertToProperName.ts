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
