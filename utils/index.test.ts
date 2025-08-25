import { menu_data } from '@/test/mock-data';

import { formatDate, getDateString, transformMenuItems } from './index';

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

describe('transformMenuItems', () => {
  it('should return an empty object when there are no menu items', () => {
    const result = transformMenuItems([]);

    expect(result).toEqual({});
  });

  it('should return an object with holiday when there is a holiday menu item', () => {
    const menuItems = [
      {
        is_section_title: false,
        is_holiday: true,
        no_line_break: false,
        position: 0,
        text: 'Labor Day',
        food: null,
        category: null,
        serving_size_amount: null,
        serving_size_unit: null,
      },
    ];

    const result = transformMenuItems(menuItems);

    expect(result.holiday).toEqual('Labor Day');
    expect(result.entrees?.length).toEqual(0);
    expect(result.sides?.length).toEqual(0);
  });

  it('should return an object with entrees and sides when there are menu items', () => {
    const day = menu_data.days[2];
    const result = transformMenuItems(day.menu_items);

    expect(result.holiday).toBeNull();
    expect(result.entrees?.length).toBeGreaterThan(0);
    expect(result.sides?.length).toBeGreaterThan(0);
  });
});
