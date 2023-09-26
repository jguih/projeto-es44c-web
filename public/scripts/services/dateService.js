
/** @param {Date} date */
export const formatDate = (date) => {
  return date.toUTCString().split("00")[0];
}