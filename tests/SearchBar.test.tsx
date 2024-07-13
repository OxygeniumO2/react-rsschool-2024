import { it, expect, describe, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchBar } from '../src/components/SearchBar/SearchBar';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';

describe('SearchBar', () => {
  const handleSearch = vi.fn();
  const handleButtonClick = vi.fn();

  it('should call handleSearch correctly on input change', () => {
    render(
      <SearchBar
        searchText=""
        handleSearch={handleSearch}
        handleButtonClick={handleButtonClick}
      />
    );

    const searchInput = screen.getByPlaceholderText('search');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(handleSearch).toHaveBeenCalledWith('test');
  });

  it('should call handleButtonClick correctly on Enter key press', () => {
    render(
      <SearchBar
        searchText=""
        handleSearch={handleSearch}
        handleButtonClick={handleButtonClick}
      />
    );

    const searchInput = screen.getByPlaceholderText('search');
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

    expect(handleButtonClick).toHaveBeenCalled();
  });

  it('should call handleButtonClick correctly on button click', () => {
    render(
      <SearchBar
        searchText=""
        handleSearch={handleSearch}
        handleButtonClick={handleButtonClick}
      />
    );

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    expect(handleButtonClick).toHaveBeenCalled();
  });
});
