import { waitFor } from '@testing-library/react-native';
import { http, HttpResponse } from 'msw';

import { empty_menu_data } from '@/test/mock-data';
import { server } from '@/test/setup';
import { renderWithClient } from '@/test/utils';

import Index from '../app/index';

describe('index', () => {
  it('should render loading state initially when fetching menu data', async () => {
    const { getByText } = renderWithClient(<Index />);

    expect(getByText('Loading...')).toBeDefined();
  });

  it('should render error message when when there is an error fetching menu data', async () => {
    server.use(
      http.get('*', () => {
        return HttpResponse.error();
      }),
    );

    const { getByText } = renderWithClient(<Index />);

    await waitFor(() => expect(getByText('Failed to fetch')).toBeDefined());
  });

  it('should render a message when there is no menu data', async () => {
    server.use(
      http.get('*', () => {
        return HttpResponse.json(empty_menu_data);
      }),
    );

    const { getByText } = renderWithClient(<Index />);

    await waitFor(() => expect(getByText('No menu available for this week.')).toBeDefined());
  });

  it('should render list of menu items', async () => {
    const { getByText } = renderWithClient(<Index />);

    // TODO: Test that there are 5 cards on the screen
    await waitFor(() => expect(getByText('Mon, Sep 1')).toBeDefined());
  });
});
