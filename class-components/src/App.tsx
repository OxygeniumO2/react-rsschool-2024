import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import { SEARCH_TEXT_OXY } from './constants/localStorageKeys';
import { Character, getCharacters } from './services/getCharacters';
import CardList from './components/CardList/CardList';

class App extends React.Component {
  state: {
    searchText: string;
    characters: Character[] | [];
  } = {
    searchText: localStorage.getItem(SEARCH_TEXT_OXY) || '',
    characters: [],
  };

  handleSearch = (searchText: string) => {
    this.setState({ searchText });
  };

  handleSearchLS = async () => {
    localStorage.setItem(SEARCH_TEXT_OXY, this.state.searchText);
    const { characters } = await getCharacters({ name: this.state.searchText });
    this.setState({
      characters: characters,
    });
  };

  componentDidMount() {
    this.handleSearchLS();
  }
  render(): React.ReactNode {
    return (
      <>
        <SearchBar
          searchText={this.state.searchText}
          handleSearch={this.handleSearch}
          handleButtonClick={this.handleSearchLS}
        />
        <CardList cards={this.state.characters} />
      </>
    );
  }
}

export default App;
