import { renderHook, waitFor } from '@testing-library/react-native';

import { createWrapper, testQueryClient } from '@/app/__tests__/utils';
import { menu_data } from '@/test/mock-data';

import { useMenuDetails } from '../useMenuDetails';

const QUERY_KEY = '2025-09-01';

describe('useMenuDetails', () => {
  it('should return data', async () => {
    testQueryClient.setQueryData(['menu', QUERY_KEY], menu_data);
    const { result } = renderHook(() => useMenuDetails(QUERY_KEY, '2025-09-01'), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current).toBeDefined());
  });

  it('should return null if there is no data for that date', async () => {
    const { result } = renderHook(() => useMenuDetails(QUERY_KEY, '2025-09-10'), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current).toBeUndefined());
  });
});
