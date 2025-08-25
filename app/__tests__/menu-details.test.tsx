import { useLocalSearchParams } from 'expo-router';

import { useMenuDetails } from '@/api/';
import { MESSAGES } from '@/constants/messages';
import { menu_data } from '@/test/mock-data';
import { renderWithClient } from '@/test/utils';

import MenuDetails from '../menu-details';

jest.mock('@/api', () => ({
  useMenuDetails: jest.fn(),
}));

const mockUseLocalSearchParams = useLocalSearchParams as jest.MockedFunction<typeof useLocalSearchParams>;
const mockUseMenuDetails = useMenuDetails as jest.MockedFunction<typeof useMenuDetails>;

describe('detail', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render detail page', () => {
    mockUseLocalSearchParams.mockReturnValue({ date: '2025-09-02', currentDate: '2025-09-01' });
    mockUseMenuDetails.mockReturnValue(menu_data.days.find(day => day.date === '2025-09-02'));
    const { getByText } = renderWithClient(<MenuDetails />);

    expect(getByText('Tuesday, Sep 2')).toBeDefined();
    expect(getByText('Pick One Entree')).toBeDefined();
  });

  it('should render detail page with holiday', () => {
    mockUseLocalSearchParams.mockReturnValue({ date: '2025-09-01', currentDate: '2025-09-01' });
    mockUseMenuDetails.mockReturnValue(menu_data.days.find(day => day.date === '2025-09-01'));
    const { getByText } = renderWithClient(<MenuDetails />);

    expect(getByText('Monday, Sep 1')).toBeDefined();
    expect(getByText('Labor Day')).toBeDefined();
  });

  it('should render error state when there is an error loading menu details', () => {
    mockUseLocalSearchParams.mockReturnValue({ date: '2025-09-10', currentDate: '2025-09-01' });
    mockUseMenuDetails.mockReturnValue(undefined);
    const { getByText } = renderWithClient(<MenuDetails />);

    expect(getByText(MESSAGES.ERRORS.UNABLE_TO_LOAD_MENU_DETAILS)).toBeDefined();
  });
});
