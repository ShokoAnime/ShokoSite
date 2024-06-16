type DateFormat = 'string' | 'array';

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
    .replace(/\bUi\b/g, 'UI')
    .replace(/\bJmm\b/g, 'JMM');
};

export const convertNameToUrl = (path: string) => {
  return path
    .replace(/ /g, '-')
    .replace('.md', '')
    .toLowerCase();
};

export const convertDate = (dateString: string, format: DateFormat = 'string') => {
  const getDaySuffix = (day: number) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const dateParts = dateString.split('-');
  const year = parseInt(dateParts[0], 10);
  const monthIndex = parseInt(dateParts[1], 10) - 1;
  const day = parseInt(dateParts[2], 10);

  const date = new Date(year, monthIndex, day);
  const options: Intl.DateTimeFormatOptions = { month: 'short' };
  const monthShort = date.toLocaleDateString('en-US', options);
  const optionsLong: Intl.DateTimeFormatOptions = { month: 'long' };
  const monthLong = date.toLocaleDateString('en-US', optionsLong);
  const daySuffix = getDaySuffix(day);

  if (format === 'array') {
    return [day, monthShort, year];
  }

  return `${monthLong} ${day}${daySuffix}, ${year}`;
};
