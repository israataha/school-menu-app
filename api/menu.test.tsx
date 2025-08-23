import { renderHook, waitFor } from '@testing-library/react-native';
import { http, HttpResponse } from 'msw';

import { server } from '@/test/setup';
import { createWrapper } from '@/test/utils';

import { useFetchMenu } from './menu';

describe('useFetchMenu', () => {
  it('should return a success response', async () => {
    const { result } = renderHook(() => useFetchMenu(new Date('2025-09-01')), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('should throw an error when the API returns an error', async () => {
    server.use(
      http.get('*', () => {
        return HttpResponse.error();
      }),
    );
    const { result } = renderHook(() => useFetchMenu(new Date('2025-09-01')), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isError).toBe(true));
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
