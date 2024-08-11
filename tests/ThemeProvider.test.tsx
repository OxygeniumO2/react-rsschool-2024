import { ThemeProvider } from '../src/providers/ThemeProvider';
import { render, screen } from '../src/utils/test-utilts';

describe('ThemeProvider', () => {
  it('should render correctly', () => {
    render(<ThemeProvider>{<h1>test</h1>}</ThemeProvider>);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
