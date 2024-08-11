import { AppModify } from '../src/App';
import { render, screen } from '../src/utils/test-utilts';

beforeAll(() => {
  global.URL.createObjectURL = vi.fn();
});

describe('Main Component Tests', () => {
  it('renders main components correctly', () => {
    render(<AppModify>{null}</AppModify>);

    expect(screen.getByTestId('app')).toBeInTheDocument();
  });
});
