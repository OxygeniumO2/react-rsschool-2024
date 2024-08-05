import {
  cleanup,
  render as renderTL,
  RenderOptions,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeStore } from '../store/store';

afterEach(() => {
  cleanup();
});

function customRender(
  ui: React.ReactElement,
  options: Omit<RenderOptions, 'queries'> = {}
): ReturnType<typeof renderTL> {
  return renderTL(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => (
      <Provider store={makeStore()}>{children} </Provider>
    ),
    ...options,
  });
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
// override render export
export { customRender as render };
