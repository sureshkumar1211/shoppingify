export const getDateFromDateTime = (dateTime: string) => {
  const formatDate = new Date(dateTime);
  const MONTH_NAMES = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return {
    date: formatDate.getDate(),
    month: formatDate.getMonth(),
    monthName: MONTH_NAMES[formatDate.getMonth()],
    year: formatDate.getFullYear(),
    localeString: formatDate.toLocaleDateString(),
  };
};
