import '@testing-library/jest-dom';
import { it, expect, describe } from 'vitest';
import { render } from '@testing-library/react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import ErrorBoundary from '../src/components/ErrorBoundary/ErrorBoundary';

describe('ErrorBoundary', () => {
  const ErrorComponent = () => {
    throw new Error('Test error');
  };

  it('should render fallback UI when there is an error', () => {
    const fallback = <div>Something went wrong!</div>;

    const { getByText } = render(
      <ErrorBoundary fallback={fallback}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(getByText('Something went wrong!')).toBeInTheDocument();
  });

  it('should render children when there is no error', () => {
    const { getByText } = render(
      <ErrorBoundary fallback={<div>Something went wrong!</div>}>
        <div>Normal content</div>
      </ErrorBoundary>
    );

    expect(getByText('Normal content')).toBeInTheDocument();
  });
});
