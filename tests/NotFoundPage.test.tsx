import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NotFoundPage } from '../src/pages/NotFoundPage/NotFoundPage';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

describe('NotFoundPage', () => {
  it('should render correctly with expected text and link', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText('404 Page Not Found')).toBeInTheDocument();
    expect(screen.getByText('To main')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'To main' })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
