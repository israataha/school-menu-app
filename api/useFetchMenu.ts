import { useQuery } from '@tanstack/react-query';

import type { Day, Menu } from './types';

const MENU_URL = 'https://dbqschools.api.nutrislice.com/menu/api/weeks/school/eisenhower-elementary/menu-type/lunch';

/**
 * Fetches menu data for the week the provided date falls in using the date as the queryKey.
 * If the data is not found in the query cache, it is fetched from the API and cached.
 *
 * Menu data does not change frequently, however we want to make sure we are fetching the latest data every day in case it does
 * so that the most accurate menu data is displayed.
 *
 * Days with not menu items (typically weekends or days when school is not in session) are filtered out and not included in the response.
 *
 * @param {Date} date typically the current date
 * @returns {UseQueryResult<Menu, Error>} the menu data for the week the provided date falls in
 */
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
