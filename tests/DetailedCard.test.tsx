import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { DetailedCard } from '../src/components/CardList/DetailedCard/DetailedCard';

describe('DetailedCard', () => {
  it('should render the character name and close button', () => {
    const character = {
      id: '1',
      name: 'test character',
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
    const handleCloseDetailedCard = vi.fn();

    render(
      <DetailedCard
        character={character}
        handleCloseDetailedCard={handleCloseDetailedCard}
      />
    );

    expect(screen.getByText('test character')).toBeInTheDocument();

    const closeButton = screen.getByText('Close');
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(handleCloseDetailedCard).toHaveBeenCalledTimes(1);
  });
});
