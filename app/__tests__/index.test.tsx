import { screen, waitFor } from '@testing-library/react-native';
import { http, HttpResponse } from 'msw';

import { renderWithClient } from '@/app/__tests__/utils';
import { empty_menu_data } from '@/test/mock-data';
import { server } from '@/test/setup';

import Index from '../index';

// const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe('index', () => {
  it('should render loading state initially when fetching menu data', async () => {
    const { getByText } = renderWithClient(<Index />);

    expect(getByText("Loading this week's menu")).toBeDefined();
  });

  it('should render error message when when there is an error fetching menu data', async () => {
    server.use(
      http.get('*', () => {
        return HttpResponse.error();
      }),
    );

    const { getByLabelText } = renderWithClient(<Index />);

    await waitFor(() => expect(getByLabelText('error')).toBeDefined());
  });

  it('should render a message when there is no menu data', async () => {
    server.use(
      http.get('*', () => {
        return HttpResponse.json(empty_menu_data);
      }),
    );

    const { getByText } = renderWithClient(<Index />);

    await waitFor(() => expect(getByText('No menu available for this week')).toBeDefined());

    expect(screen.queryByLabelText('date')).toBeNull();
  });

  it('should render list of menu items', async () => {
    const { getByText, getAllByLabelText } = renderWithClient(<Index />);

    await waitFor(() => expect(getByText("This week's menu")).toBeDefined());

    expect(getAllByLabelText('date')).toHaveLength(5);
  });
});
