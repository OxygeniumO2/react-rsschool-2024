import '@testing-library/jest-dom';
import { server } from './server';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterAll(() => {
  server.close();
});

afterEach(() => {
  server.resetHandlers();
});

vi.mock('next/router', () => require('next-router-mock'));
