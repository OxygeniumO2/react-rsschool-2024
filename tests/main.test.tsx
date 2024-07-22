import { App } from '../src/App';
import { render, screen } from '../src/utils/test-utilts';

describe('Main Component Tests', () => {
  it('renders main components correctly', () => {
    render(<App />);

    expect(screen.getByTestId('app')).toBeInTheDocument();
  });
});
