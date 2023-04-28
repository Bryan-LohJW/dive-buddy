export const passedNDays = (n: number, lastVisit: string) => {
  return (
    new Date().valueOf() - Date.parse(lastVisit).valueOf() >
    1000 * 60 * 60 * 24 * n
  );
};
