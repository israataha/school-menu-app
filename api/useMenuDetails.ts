import { useQueryClient } from '@tanstack/react-query';

import { Menu } from './types';

export const useMenuDetails = (date: string) => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<Menu>(['menu', date])?.days.find(day => day.date === date);
  return data;
};
