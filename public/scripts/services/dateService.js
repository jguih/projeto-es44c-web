
/** 
 * Convertes the input element value date string to UTC date string.
 * @param {string} date 
 * @returns {string}
 */
export const inputDateToUTCDate = (date) => {
  // Data incoming from date input will always be yyyy-mm-dd
  const [year, month, day] = date.split('-');
  // UTC month is 0-11 index based, so we need to subtract 1 from month
  const utcDate = Date.UTC(year, Number.parseInt(month) - 1, day);
  // Creates a new UTC date string
  const parsedDate = new Date(utcDate).toUTCString();
  // Extracts all info from UTC date string
  const [pDays, pDayn, pMonth, pYear, time, timezone] = parsedDate.split(" ");
  return `${pDays} ${pDayn} ${pMonth} ${pYear}`;
}