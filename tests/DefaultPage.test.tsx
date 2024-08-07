import DefaultPage from '../src/app/page';
import { render, waitFor } from '../src/utils/test-utilts';

describe('DefaultPage', () => {
  it('should redirect to /search/name=""/1', () => {
    render(<DefaultPage />);

    expect(window.location.pathname).toBe('/');

    waitFor(() => {
      expect(window.location.pathname).toBe('/search/name=""/1');
    });
  });
});
