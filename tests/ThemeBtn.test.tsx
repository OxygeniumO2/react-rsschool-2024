import { ChangeTheme } from '../src/components/changeTheme/ChangeTheme';
import { render, screen } from '../src/utils/test-utilts';

describe('Loader', () => {
  it('should render Prev and Next buttons correctly', () => {
    render(<ChangeTheme />);

    expect(screen.getByText('LIGHT')).toBeInTheDocument();
  });
});
