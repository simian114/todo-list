export const DATE_OPTION: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const getDate = (
  date: Date,
  options: Intl.DateTimeFormatOptions = DATE_OPTION,
): string => {
  return date.toLocaleString('ko-KR', options);
};

export default getDate;
