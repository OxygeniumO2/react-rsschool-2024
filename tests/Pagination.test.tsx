import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { vi } from 'vitest';
import { Pagination } from '../src/components/Pagination/Pagination';

describe('Pagination', () => {
  const charactersData = {
    characters: [
      {
        id: '1',
        name: 'Character 1',
        images: ['image1.jpg'],
        debut: { appearsIn: 'Movie 1' },
        personal: {
          sex: 'Male',
        },
      },
    ],
    total: 2,
    limit: 6,
    page: 1,
    currentPage: 1,
    pageSize: 6,
  };

  const onPageChange = vi.fn();

  it('should render Prev and Next buttons correctly', () => {
    render(
      <MemoryRouter>
        <Pagination
          charactersData={charactersData}
          onPageChange={onPageChange}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('should disable Prev button on first page', () => {
    render(
      <MemoryRouter>
        <Pagination
          charactersData={charactersData}
          onPageChange={onPageChange}
        />
      </MemoryRouter>
    );

    const prevButton = screen.getByText('Prev');
    expect(prevButton).toBeDisabled();
  });

  it('should disable Next button on last page', () => {
    const charactersDataLastPage = {
      ...charactersData,
      currentPage: 2,
    };

    render(
      <MemoryRouter>
        <Pagination
          charactersData={charactersDataLastPage}
          onPageChange={onPageChange}
        />
      </MemoryRouter>
    );

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('should call onPageChange correctly when page number button is clicked', () => {
    const charactersData = {
      characters: [
        {
          id: '1',
          name: 'Character 1',
          images: ['image1.jpg'],
          debut: { appearsIn: 'Movie 1' },
          personal: {
            sex: 'Male',
          },
        },
      ],
      total: 100,
      limit: 6,
      page: 1,
      currentPage: 1,
      pageSize: 6,
    };
    render(
      <MemoryRouter>
        <Pagination
          charactersData={charactersData}
          onPageChange={onPageChange}
        />
      </MemoryRouter>
    );

    const page2Button = screen.getByText('2');
    fireEvent.click(page2Button);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
