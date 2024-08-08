import { Card } from '../src/components/CardList/Card/Card';
import { render } from '../src/utils/test-utilts';

describe('CardList', () => {
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

  it('should render the specified number of cards', () => {
    const { getByText } = render(
      <Card card={cardData} handleDetailedCard={() => {}} key={cardData.id} />
    );
    expect(getByText('test1')).toBeInTheDocument();
  });
});
