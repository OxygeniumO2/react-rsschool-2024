import { NotFoundPage } from '../src/components/NotFoundPage/NotFoundPage';
import NotFound from '../src/pages/404';
import { render, screen } from '../src/utils/test-utilts';

describe('NotFoundPage', () => {
  it('should render correctly with expected text and link', () => {
    render(<NotFoundPage />);

    expect(screen.getByText('404 Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('To main')).toBeInTheDocument();
  });

  it('should render correctly with expected text and link', () => {
    render(<NotFound />);

    expect(screen.getByText('404 Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('To main')).toBeInTheDocument();
  });
});
