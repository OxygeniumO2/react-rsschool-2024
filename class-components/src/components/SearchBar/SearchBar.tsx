import React from 'react';
import styles from './searchBar.module.css';

type SearchBarProps = {
  searchText: string;
  handleSearch: (searchText: string) => void;
  handleButtonClick: () => void;
};

class SearchBar extends React.Component<SearchBarProps> {
  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value.trim();
    this.props.handleSearch(searchText);
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      this.props.handleButtonClick();
    }
  };

  render() {
    return (
      <div className={styles.searchBar}>
        <input
          className={styles.searchInput}
          type="text"
          name=""
          id=""
          placeholder="search"
          value={this.props.searchText}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
        />
        <button onClick={this.props.handleButtonClick} type="button">
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
