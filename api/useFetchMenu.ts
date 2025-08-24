import { useQuery } from '@tanstack/react-query';

import { Day, Menu } from './types';

const MENU_URL = 'https://dbqschools.api.nutrislice.com/menu/api/weeks/school/eisenhower-elementary/menu-type/lunch';

export function useFetchMenu(date: Date) {
  return useQuery<Menu>({
    queryKey: ['menu', date.toISOString().split('T')[0]],
    queryFn: async () => {
      const response = await fetch(`${MENU_URL}/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/`);
      return await response.json();
      //throw new Error('Failed to fetch menu data');
    },
    // https://tanstack.com/query/v5/docs/framework/react/guides/render-optimizations#select
    select: (data: Menu) => ({
      ...data,
      days: data.days.filter((day: Day) => day.menu_items.length > 0), // filter out days with no menu items (weekends)
    }),
  });
}
