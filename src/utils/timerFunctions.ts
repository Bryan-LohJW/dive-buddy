import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(RelativeTime);

export const formatDate = (date: Date) => {
  let displayTime = "";
  if (Date.now().valueOf() - date.valueOf() < 1000 * 60 * 60 * 24 * 7) {
    displayTime = dayjs(date).fromNow();
  } else {
    displayTime = dayjs(date).format("DD MMM YYYY");
  }
  return displayTime;
};
