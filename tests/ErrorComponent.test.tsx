import { render } from '@testing-library/react';
import { ErrorComponent } from '../src/components/ErrorBoundary/ErrorComponent/ErrorComponent';
import { MemoryRouter } from 'react-router-dom';

describe('ErrorComponent', () => {
  it('should render the error message', () => {
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <ErrorComponent />
      </MemoryRouter>
    );
    expect(getByRole('heading')).toBeInTheDocument();
    expect(getByText('Something went wrong')).toBeInTheDocument();
  });
});
