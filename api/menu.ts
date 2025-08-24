import { useQuery, useQueryClient } from '@tanstack/react-query';

import { Day, Menu } from './types';

const MENU_URL = 'https://dbqschools.api.nutrislice.com/menu/api/weeks/school/eisenhower-elementary/menu-type/lunch';

export function useFetchMenu(date: Date) {
  return useQuery<Menu>({
    queryKey: ['menu', date.toISOString().split('T')[0]],
    queryFn: async () => {
      const response = await fetch(`${MENU_URL}/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/`);
      return await response.json();
    },
    // https://tanstack.com/query/v5/docs/framework/react/guides/render-optimizations#select
    select: (data: Menu) => ({
      ...data,
      days: data.days.filter((day: Day) => day.menu_items.length > 0), // filter out days with no menu items (weekends)
    }),
  });
}

export const useMenuData = (date: string) => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<Menu>(['menu'])?.days.find(day => day.date === date);
  return data;
};
