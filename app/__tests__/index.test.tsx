import { screen, waitFor } from '@testing-library/react-native';
import { http, HttpResponse } from 'msw';

import { renderWithClient } from '@/app/__tests__/utils';
import { MESSAGES } from '@/constants/messages';
import { empty_menu_data } from '@/test/mock-data';
import { server } from '@/test/setup';

import Index from '../index';

// const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe('index', () => {
  it('should render loading state initially when fetching menu data', async () => {
    const { getByText } = renderWithClient(<Index />);

    expect(getByText(MESSAGES.LOADING.WEEKLY_MENU)).toBeDefined();
  });

  it('should render error message when when there is an error fetching menu data', async () => {
    server.use(
      http.get('*', () => {
        return HttpResponse.error();
      }),
    );

    const { getByLabelText } = renderWithClient(<Index />);

    await waitFor(() => expect(getByLabelText('error state')).toBeDefined());
  });

  it('should render a message when there is no menu data', async () => {
    server.use(
      http.get('*', () => {
        return HttpResponse.json(empty_menu_data);
      }),
    );

    const { getByText } = renderWithClient(<Index />);

    await waitFor(() => expect(getByText(MESSAGES.EMPTY_STATES.NO_MENU_AVAILABLE)).toBeDefined());

    expect(screen.queryByLabelText('date')).toBeNull();
  });

  it('should render list of menu items', async () => {
    const { getByText, getAllByLabelText } = renderWithClient(<Index />);

    await waitFor(() => expect(getByText(MESSAGES.MENU.WEEKLY_MENU_HEADER)).toBeDefined());

    expect(getAllByLabelText('date')).toHaveLength(5);
  });
});
