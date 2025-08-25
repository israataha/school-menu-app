import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { testQueryClient } from '../app/__tests__/utils';
import { menu_data } from './mock-data';

jest.mock('expo-router', () => ({
  router: { push: jest.fn() },
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    // ... mock other router methods as needed
  }),
  useFocusEffect: jest.fn(),
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
