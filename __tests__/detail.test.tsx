import { useLocalSearchParams } from 'expo-router';

import { useMenuData } from '@/api/menu';
import Detail from '@/app/detail/[date]';
import { menu_data } from '@/test/mock-data';
import { renderWithClient } from '@/test/utils';

jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(),
}));

jest.mock('@/api/menu', () => ({
  useMenuData: jest.fn(),
}));

const mockUseLocalSearchParams = useLocalSearchParams as jest.MockedFunction<typeof useLocalSearchParams>;
const mockUseMenuData = useMenuData as jest.MockedFunction<typeof useMenuData>;

describe('detail', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render detail page', () => {
    mockUseLocalSearchParams.mockReturnValue({ date: '2025-09-02' });
    mockUseMenuData.mockReturnValue(menu_data.days.find(day => day.date === '2025-09-02'));
    const { getByText } = renderWithClient(<Detail />);

    expect(getByText('Tuesday, Sep 2')).toBeDefined();
    expect(getByText('Pick One Entree')).toBeDefined();
  });

  it('should render detail page with holiday', () => {
    mockUseLocalSearchParams.mockReturnValue({ date: '2025-09-01' });
    mockUseMenuData.mockReturnValue(menu_data.days.find(day => day.date === '2025-09-01'));
    const { getByText } = renderWithClient(<Detail />);

    expect(getByText('Monday, Sep 1')).toBeDefined();
    expect(getByText('Labor Day')).toBeDefined();
  });
});
