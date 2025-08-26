import { formatDate, getDateString } from './index';

describe('getDateString', () => {
  it('should return the date string in YYYY-MM-DD format', () => {
    const result = getDateString(new Date('2025-08-26'));
    expect(result).toEqual('2025-08-26');
  });
});

describe('formatDate', () => {
  it('should return the formatted date components with default options', () => {
    const result = formatDate('2025-08-26');

    expect(result).toEqual({
      weekday: 'Tuesday',
      month: 'August',
      day: '26',
      year: '2025',
    });
  });

  it('should return the formatted date components with custom options', () => {
    const result = formatDate('2025-08-26', { weekday: 'short', month: 'short' });

    expect(result).toEqual({
      weekday: 'Tue',
      month: 'Aug',
      day: '26',
      year: '2025',
    });
  });

  it('should return null if dateString is empty', () => {
    let result = formatDate('');
    expect(result).toBeNull();

    result = formatDate('      ');
    expect(result).toBeNull();
  });

  it('should return null if dateString is not a valid date', () => {
    let result = formatDate('date');
    expect(result).toBeNull();

    result = formatDate('123');
    expect(result).toBeNull();
  });

  it('should return null if date is in different format', () => {
    const result = formatDate('08/26/2025');
    expect(result).toBeNull();
  });
});
