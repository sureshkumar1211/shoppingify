import { getDateFromDateTime } from "./dateTimeConverter";

export const sortHistoryByMonth = (histories) => {
  const mapHistoriesWithMonth = {};
  histories.map((history) => {
    const { createdAt } = history;
    const { monthName, year } = getDateFromDateTime(createdAt);
    if (mapHistoriesWithMonth[`${monthName} ${year}`]) {
      mapHistoriesWithMonth[`${monthName} ${year}`].push(history);
    } else {
      mapHistoriesWithMonth[`${monthName} ${year}`] = [history];
    }
  });
  return mapHistoriesWithMonth;
};
