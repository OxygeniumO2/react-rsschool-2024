import NotFound from '../src/app/not-found';
import { render, screen } from '../src/utils/test-utilts';

describe('DefaultPage', () => {
  it('should render loading', () => {
    render(<NotFound />);

    expect(screen.getByText('404 Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('To main')).toBeInTheDocument();
  });
});
