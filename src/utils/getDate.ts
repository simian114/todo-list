const getDate = (date: Date, options: Intl.DateTimeFormatOptions): string => {
  return date.toLocaleString('ko-KR', options);
};

export default getDate;
