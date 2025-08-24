import { menu_data } from '@/test/mock-data';

import { transformMenuItems } from './index';

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
