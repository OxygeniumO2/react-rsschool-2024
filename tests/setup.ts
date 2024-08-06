import '@testing-library/jest-dom';
import { server } from './server';
vi.mock('next/navigation', () => require('next-navigation-mock'));

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterAll(() => {
  server.close();
});

afterEach(() => {
  server.resetHandlers();
});
