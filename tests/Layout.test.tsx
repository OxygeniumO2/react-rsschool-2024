import Layout, { ThemeProvider } from '../src/components/Layout/Layout';
import { render, waitFor, screen } from '../src/utils/test-utilts';

describe('Layout', () => {
  it('should render correctly', async () => {
    render(<Layout>{null} </Layout>);
    await waitFor(() => {
      expect(screen.getByTestId('app')).toBeInTheDocument();
    });
  });

  it('should not render body', async () => {
    render(<ThemeProvider>{null}</ThemeProvider>);
    await waitFor(() => {
      expect(screen.queryByRole('body')).not.toBeInTheDocument();
    });
  });
});
