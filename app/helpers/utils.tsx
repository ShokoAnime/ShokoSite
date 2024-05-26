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

export const convertDate = (dateString: string) => {
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
  const options: Intl.DateTimeFormatOptions = { month: 'long' };
  const month = date.toLocaleDateString('en-US', options);
  const daySuffix = getDaySuffix(day);

  return `${month} ${day}${daySuffix}, ${year}`;
};
