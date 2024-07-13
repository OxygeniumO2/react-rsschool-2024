import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CardList } from '../src/components/CardList/CardList';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render DetailedCard component when detailedCard is not null', () => {
    render(
      <MemoryRouter>
        <CardList
          cards={cardsData}
          detailedCard={cardsData[0]}
          handleDetailedCard={() => null}
        />
      </MemoryRouter>
    );

    expect(screen.getByTestId('detailed-card')).toBeInTheDocument();
  });

  it('should not render DetailedCard component when detailedCard is null', () => {
    render(
      <MemoryRouter>
        <CardList
          cards={cardsData}
          detailedCard={null}
          handleDetailedCard={() => null}
        />
      </MemoryRouter>
    );

    expect(screen.queryByTestId('detailed-card')).not.toBeInTheDocument();
  });
});
