import { MenuItem } from '@/api/types';

export const formatDate = (date: string, options?: Intl.DateTimeFormatOptions) =>
  new Date(`${date}T00:00:00.000`).toLocaleDateString(
    'en-US',
    options || {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    },
  );

export const transformMenuItems = (menuItems: MenuItem[]) => {
  if (menuItems.length === 0) return {};
  if (menuItems.length === 1 && menuItems[0].is_holiday) return { holiday: menuItems[0].text, entrees: [], sides: [] };

  const sidesIndex = menuItems.findLast(item => item.is_section_title && !item.is_holiday)?.position;

  return {
    holiday: null,
    entrees: menuItems.slice(1, sidesIndex),
    sides: menuItems.slice(sidesIndex! + 1, menuItems.length),
  };
};
