export const convertDateToTimestamp = (date: Date) => {
  return date.getTime();
};

export const moyenneTimestamps = (timesTamps: number[]) => {
  let avg = 0;
  let sum = 0;

  if (timesTamps.length) {
    sum = timesTamps.reduce((a, b) => {
      return a + b;
    });
    avg = sum / timesTamps.length;
  }

  return Math.round(avg);
};
