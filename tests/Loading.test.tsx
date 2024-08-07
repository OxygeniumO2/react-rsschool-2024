import Loading from '../src/app/loading';
import { render, screen } from '../src/utils/test-utilts';
import Loading2 from '../src/app/search/[name]/[page]/[details]/loading';

describe('DefaultPage', () => {
  it('should render loading', () => {
    render(<Loading />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render loading', () => {
    render(<Loading2 />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
