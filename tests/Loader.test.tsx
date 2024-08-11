import { Loader } from '../src/components/Loader/Loader';
import { render, screen } from '../src/utils/test-utilts';

describe('Loader', () => {
  it('should render Loader', () => {
    render(<Loader />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
