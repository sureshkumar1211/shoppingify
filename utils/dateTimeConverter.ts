export const getDateFromDateTime = (dateTime: string) => {
  const formatDate = new Date(dateTime);
  return {
    date: formatDate.getDate(),
    month: formatDate.getMonth(),
    year: formatDate.getFullYear(),
    localeString: formatDate.toLocaleDateString(),
  };
};
