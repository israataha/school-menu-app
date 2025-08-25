import { useQueryClient } from '@tanstack/react-query';

import { Menu } from './types';

/**
 * Returns the menu data for a specific date by querying the queryClient
 * and returning the data from the query cache if it exists.
 *
 * @param {string} queryKey - the key to use for the query - the current date
 * @param {string} date - the date to fetch data for
 * @returns the menu data for a specific date
 */
export const useMenuDetails = (queryKey: string, date: string) => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<Menu>(['menu', queryKey])?.days.find(day => day.date === date);
};
