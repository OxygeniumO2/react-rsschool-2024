import { Loader } from '../src/components/Loader/Loader';
import { render, screen } from '../src/utils/test-utilts';

describe('Loader', () => {
  it('should render Prev and Next buttons correctly', () => {
    render(<Loader />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
