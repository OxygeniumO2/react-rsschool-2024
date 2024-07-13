import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CardListSection } from '../src/components/CardListSection/CardListSection';
import { MemoryRouter } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { vi } from 'vitest';

describe('CardListSection', () => {
  const charactersData = {
    characters: [
      {
        id: '1',
        name: 'Character 1',
        images: ['image1.jpg'],
        debut: { appearsIn: 'Movie 1' },
        personal: {
          sex: 'Male',
          clan: 'Clan 1',
          classification: 'Classification 1',
        },
      },
      {
        id: '2',
        name: 'Character 2',
        images: ['image2.jpg'],
        debut: { appearsIn: 'Movie 2' },
        personal: {
          sex: 'Female',
          clan: 'Clan 2',
          classification: 'Classification 2',
        },
      },
    ],
    total: 2,
    limit: 6,
    page: 1,
    currentPage: 1,
    pageSize: 6,
  };

  it('should render Loader when isLoading is true', () => {
    render(
      <MemoryRouter>
        <CardListSection
          charactersData={null}
          isLoading={true}
          handleCharactersData={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render CardList when charactersData is provided', () => {
    render(
      <MemoryRouter>
        <CardListSection
          charactersData={charactersData}
          isLoading={false}
          handleCharactersData={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Character 1')).toBeInTheDocument();
    expect(screen.getByText('Character 2')).toBeInTheDocument();
  });

  it('should render Pagination when charactersData is provided', () => {
    const handleCharactersData = vi.fn();

    render(
      <MemoryRouter>
        <CardListSection
          charactersData={charactersData}
          isLoading={false}
          handleCharactersData={handleCharactersData}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
