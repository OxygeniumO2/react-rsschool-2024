import { DetailedCard } from '../src/components/CardList/DetailedCard/DetailedCard';
import { render, screen, waitFor } from '../src/utils/test-utilts';

describe('DetailedCard', () => {
  it('should render correctly', async () => {
    const cardData = {
      id: '1',
      name: 'test1',
      images: ['test1', 'test2'],
      debut: {
        appearsIn: 'test',
      },
      personal: {
        sex: 'test',
        clan: 'test',
        classification: 'test',
      },
    };

    render(<DetailedCard data={cardData} />);
    await waitFor(() => {
      expect(screen.getByTestId('detailed-card')).toBeInTheDocument();
    });
  });
});
