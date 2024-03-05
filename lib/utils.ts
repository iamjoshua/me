import { format } from "date-fns";

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const month = format(date, "MMMM");
  const year = format(date, "yyyy");
  const day = getDayOrdinal(Number(format(date, "d")));
  return `${month} ${day}, ${year}`;
}

export function getDayOrdinal(day: number) {
  return day +
    (day % 10 == 1 && day != 11
      ? "st"
      : (day % 10 == 2 && day != 12
        ? "nd"
        : (day % 10 == 3 && day != 13 ? "rd" : "th")));
}
