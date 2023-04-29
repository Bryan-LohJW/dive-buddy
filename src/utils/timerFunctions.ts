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

export const formatTimeInMs = (timeInMs: number) => {
  const minutes = ("0" + Math.floor((timeInMs / 60000) % 60).toString()).slice(
    -2
  );
  const seconds = ("0" + Math.floor((timeInMs / 1000) % 60).toString()).slice(
    -2
  );
  const milliseconds = (
    "0" + Math.floor((timeInMs / 10) % 100).toString()
  ).slice(-2);

  return [minutes, seconds, milliseconds];
};
