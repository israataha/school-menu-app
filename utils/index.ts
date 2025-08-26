/**
 * Returns the date string in YYYY-MM-DD format.
 *
 * @param {Date} date The date to format
 * @returns {string} The date string in YYYY-MM-DD format
 * @example
 * getDateString(new Date()) - assuming the current date is August 26, 2025
 * // Returns '2025-08-26'
 */
export const getDateString = (date: Date) => {
  return date.toISOString().split('T')[0];
};

/**
 * Formats a date string into separate components (weekday, month, day, year).
 *
 * @param {string} dateString - The date string to format (should be in a format parseable by Date constructor)
 * @param {Intl.DateTimeFormatOptions} options - Optional formatting options for date components
 * @returns {{weekday: string, month: string, day: string, year: string} | null} Object containing formatted date components or null if dateString is empty or invalid
 * @example
 * // With no options
 * formatDate('2025-08-26')
 * // Returns: { weekday: 'Tuesday', month: 'August', day: '26', year: '2025' }
 *
 * @example
 * // With custom options
 * formatDate('2025-08-26', { weekday: 'short', month: 'short' })
 * // Returns: { weekday: 'Tue', month: 'Aug', day: '26', year: '2025' }
 */
export const formatDate = (dateString: string, options?: Intl.DateTimeFormatOptions) => {
  if (!dateString || dateString.trim() === '') return null;

  const date = new Date(`${dateString}T00:00:00.000`);

  if (date.toString() === 'Invalid Date') return null;

  const weekday = date.toLocaleDateString('en-US', {
    weekday: options?.weekday || 'long',
  });

  const month = date.toLocaleDateString('en-US', {
    month: options?.month || 'long',
  });

  const day = date.toLocaleDateString('en-US', {
    day: options?.day || 'numeric',
  });

  const year = date.toLocaleDateString('en-US', {
    year: options?.year || 'numeric',
  });

  return { weekday, month, day, year };
};
