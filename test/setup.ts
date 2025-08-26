import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { menu_data } from './mock-data';
import { testQueryClient } from './utils';

export const mockPush = jest.fn();

jest.mock('expo-router', () => ({
  router: { push: mockPush },
  useRouter: () => ({
    push: mockPush,
  }),
  useFocusEffect: jest.fn(),
  useLocalSearchParams: jest.fn(),
}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: '',
}));

export const handlers = [
  http.get('*/', () => {
    return HttpResponse.json(menu_data);
  }),
];

export const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  testQueryClient.clear();
});
afterAll(() => server.close());
