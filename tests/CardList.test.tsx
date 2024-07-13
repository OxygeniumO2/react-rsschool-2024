import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { CardList } from '../src/components/CardList/CardList';
import { MemoryRouter } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

describe('CardList', () => {
  it('should render the specified number of cards', () => {
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

    const { getByText } = render(
      <MemoryRouter>
        <CardList
          cards={cardsData}
          detailedCard={null}
          handleDetailedCard={() => null}
        />
      </MemoryRouter>
    );
    expect(getByText('test1')).toBeInTheDocument();
    expect(getByText('test2')).toBeInTheDocument();
  });

  it('should render text if there are no cards', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <CardList
          cards={[]}
          detailedCard={null}
          handleDetailedCard={() => null}
        />
      </MemoryRouter>
    );
    const noCardsMessage = getByRole('heading');
    expect(noCardsMessage).toBeInTheDocument();
    expect(noCardsMessage).toHaveTextContent('No characters found');
  });
});
