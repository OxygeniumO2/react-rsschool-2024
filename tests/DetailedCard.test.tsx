import { DetailedCard } from '../src/components/CardList/DetailedCard/DetailedCard';
import { render, screen, waitFor } from '../src/utils/test-utilts';

describe('DetailedCard', () => {
  it('should render correctly', async () => {
    render(<DetailedCard cardId={'1'} handleCloseDetailedCard={() => {}} />);
    await waitFor(() => {
      expect(screen.getByTestId('detailed-card')).toBeInTheDocument();
    });
  });
});
