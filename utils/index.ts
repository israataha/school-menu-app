import { MenuItem } from '@/api/types';

export const formatDate = (dateString: string, options?: Intl.DateTimeFormatOptions) => {
  const date = new Date(`${dateString}T00:00:00.000`);

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
