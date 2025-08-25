import { useQueryClient } from '@tanstack/react-query';

import { Menu } from './types';

/*
 * Returns the menu data for a specific date
 * @param queryKey The key to use for the query - the current date
 * @param date The date to fetch data for
 */
export const useMenuDetails = (queryKey: string, date: string) => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<Menu>(['menu', queryKey])?.days.find(day => day.date === date);
};
