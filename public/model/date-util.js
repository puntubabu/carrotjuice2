/**
 * Some ports from util.js
 */

/**
 * Parse YYYY-MM-DD date string from an ISO format string. Example:
 * '2016-03-01T00:00:00.000Z' -> '2016-03-01'
 *
 * @param{string} iso_string - Date string in ISO format, or just a Date.
 * @return{string || null} YYYY-MM-DD date string.
 */
const iso_to_yyyymmdd = (iso_string) => {
  if (!iso_string) {
    return '';
  }  // Mysteriously getting called from template w/ null...
  if (iso_string instanceof Date) {
    iso_string = iso_string.toISOString();
  }
  let match = iso_string.match(/(\d{4}-\d{2}-\d{2})T/);

  return (match && match.length === 2) ? match[1] : null;

}

/**
 * Return a date some number of days earlier.
 *
 * @param{Date} date - Starting point.
 * @param{number} num_days - Number of days to subtract.
 * @return{Date} The earlier date.
 */
const subtract_days = (date, num_days) => {
  let result = new Date(date);
  result.setDate(result.getDate() - num_days);
  return result;
};

export {
    iso_to_yyyymmdd as iso_to_yyyymmdd,
    subtract_days as subtract_days
}