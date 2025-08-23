import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { menu_data } from './mock-data';
import { testQueryClient } from './utils';

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
