import App from '../src/App';
import { render, screen } from '../src/utils/test-utilts';

beforeAll(() => {
  global.URL.createObjectURL = vi.fn();
});

describe('Main Component Tests', () => {
  it('renders main components correctly', () => {
    render(<App />);

    expect(screen.getByTestId('app')).toBeInTheDocument();
  });
});
