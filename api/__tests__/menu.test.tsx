import { renderHook, waitFor } from '@testing-library/react-native';
import { http, HttpResponse } from 'msw';

import { createWrapper, testQueryClient } from '@/app/__tests__/utils';
import { menu_data } from '@/test/mock-data';
import { server } from '@/test/setup';

import { useFetchMenu, useMenuData } from '../menu';
describe('useFetchMenu', () => {
  it('should fetch menu data', async () => {
    const { result } = renderHook(() => useFetchMenu(new Date('2025-09-01')), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.error).toBeNull();
    expect(result.current.data).toBeDefined();
  });

  it('should throw an error when the API returns an error', async () => {
    server.use(
      http.get('*', () => {
        return HttpResponse.error();
      }),
    );
    const { result } = renderHook(() => useFetchMenu(new Date('2025-09-01')), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeDefined();
    expect(result.current.data).toBeUndefined();
  });

  it('should filter out days with no menu items', async () => {
    const { result } = renderHook(() => useFetchMenu(new Date('2025-09-01')), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    const days = result.current.data?.days;
    expect(days).toBeDefined();
    expect(days).toHaveLength(5);

    expect(days?.some(day => day.date === '2025-08-31')).toBe(false);
    expect(days?.some(day => day.date === '2025-09-01')).toBe(true);
    expect(days?.some(day => day.date === '2025-09-02')).toBe(true);
    expect(days?.some(day => day.date === '2025-09-03')).toBe(true);
    expect(days?.some(day => day.date === '2025-09-04')).toBe(true);
    expect(days?.some(day => day.date === '2025-09-05')).toBe(true);
    expect(days?.some(day => day.date === '2025-09-06')).toBe(false);
  });
});

describe('useMenuData', () => {
  it('should return data', async () => {
    testQueryClient.setQueryData(['menu'], menu_data);
    const { result } = renderHook(() => useMenuData('2025-09-01'), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current).toBeDefined());
  });

  it('should return null if there is no data for that date', async () => {
    const { result } = renderHook(() => useMenuData('2025-09-10'), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current).toBeUndefined());
  });
});
