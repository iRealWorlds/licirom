/**
 * Create a new Date object from the given string, considering it to be in UTC.
 *
 * @param dateString
 */
export const utcToDate = (dateString: string): Date => {
  const year = parseInt(dateString.substring(0, 4));
  const month = parseInt(dateString.substring(5, 7)) - 1;
  const day = parseInt(dateString.substring(8, 10));
  const hour = parseInt(dateString.substring(11, 13));
  const minute = parseInt(dateString.substring(14, 16));
  const second = parseInt(dateString.substring(17, 19));

  return new Date(Date.UTC(year, month, day, hour, minute, second));
};
