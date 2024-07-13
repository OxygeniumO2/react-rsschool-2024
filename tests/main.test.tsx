import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import { vi } from 'vitest';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { NotFoundPage } from '../src/pages/NotFoundPage/NotFoundPage';
import { App } from '../src/App';
import { DetailedCard } from '../src/components/CardList/DetailedCard/DetailedCard';
import ErrorBoundary from '../src/components/ErrorBoundary/ErrorBoundary';

describe('Main Component Tests', () => {
  it('renders main components correctly', () => {
    render(
      <MemoryRouter>
        <ErrorBoundary fallback={<NotFoundPage />}>
          <App />
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(screen.getByTestId('app')).toBeInTheDocument();
  });

  it('renders detailed card component', () => {
    render(
      <MemoryRouter>
        <DetailedCard
          character={{
            id: '1',
            name: 'test character',
            images: ['test1', 'test2'],
            debut: { appearsIn: 'test' },
            personal: { sex: 'test', clan: 'test', classification: 'test' },
          }}
          handleCloseDetailedCard={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('test character')).toBeInTheDocument();
  });
});
