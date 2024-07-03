import React from 'react';

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

  render() {
    return (
      <div>
        <input
          type="text"
          name=""
          id=""
          placeholder="search"
          value={this.props.searchText}
          onChange={this.handleInputChange}
        />
        <button onClick={this.props.handleButtonClick}>Search</button>
      </div>
    );
  }
}

export default SearchBar;
