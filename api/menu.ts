import { useQuery } from '@tanstack/react-query';

import { Menu } from './types';

const MENU_URL = 'https://dbqschools.api.nutrislice.com/menu/api/weeks/school/eisenhower-elementary/menu-type/lunch';

export function useFetchMenu(date: Date) {
  return useQuery<Menu>({
    queryKey: [date.toISOString().split('T')[0]],
    queryFn: async () => {
      const response = await fetch(`${MENU_URL}/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/`);
      return await response.json();
    },
  });
}
