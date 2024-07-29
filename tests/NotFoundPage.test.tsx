import { render, screen } from '../src/utils/test-utilts';
import { NotFoundPage } from '../src/pages/NotFoundPage/NotFoundPage';

describe('NotFoundPage', () => {
  it('should render correctly with expected text and link', () => {
    render(<NotFoundPage />);

    expect(screen.getByText('404 Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('To main')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'To main' })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
