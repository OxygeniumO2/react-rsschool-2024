import { DetailedCard } from '../src/components/CardList/DetailedCard/DetailedCard';
import { render, screen, waitFor } from '../src/utils/test-utilts';

describe('DetailedCard', () => {
  it('should render correctly', async () => {
    const character = {
      id: '1',
      name: 'test',
      images: ['test'],
      debut: {
        appearsIn: 'test',
      },
      personal: {
        sex: 'test',
        clan: 'test',
        classification: 'test',
      },
    };
    render(
      <DetailedCard character={character} handleCloseDetailedCard={() => {}} />
    );
    await waitFor(() => {
      expect(screen.getByTestId('detailed-card')).toBeInTheDocument();
    });
  });
});
