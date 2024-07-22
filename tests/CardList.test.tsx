import { CardList } from '../src/components/CardList/CardList';
import { render, userEvent, screen } from '../src/utils/test-utilts';

describe('CardList', () => {
  const cardsData = [
    {
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
    },
    {
      id: '2',
      name: 'test2',
      images: ['test1', 'test2'],
      debut: {
        appearsIn: 'test',
      },
      personal: {
        sex: 'test',
        clan: 'test',
        classification: 'test',
      },
    },
  ];

  it('should render the specified number of cards', () => {
    const { getByText } = render(<CardList cards={cardsData} />);
    expect(getByText('test1')).toBeInTheDocument();
    expect(getByText('test2')).toBeInTheDocument();
  });

  it('should render text if there are no cards', () => {
    const { getByRole } = render(<CardList cards={[]} />);
    const noCardsMessage = getByRole('heading');
    expect(noCardsMessage).toBeInTheDocument();
    expect(noCardsMessage).toHaveTextContent('No characters found');
  });

  it('should render detailed card if card is clicked', async () => {
    const { getByText } = render(<CardList cards={cardsData} />);
    const card = getByText('test1');
    userEvent.click(card);
    expect(getByText('test1')).toBeInTheDocument();
    const detailedCard = await screen.findByTestId('detailed-card');
    expect(detailedCard).toBeInTheDocument();
  });
});
