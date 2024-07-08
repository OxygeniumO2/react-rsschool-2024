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
    counter: number;
    isLoading: boolean;
  } = {
    searchText: localStorage.getItem(SEARCH_TEXT_OXY) || '',
    characters: [],
    counter: 0,
    isLoading: true,
  };

  handleSearch = (searchText: string) => {
    this.setState({ searchText });
  };

  handleClickError = () => {
    this.setState({ counter: this.state.counter + 1 });
  };

  handleSearchLS = async (initialLoad: boolean = false) => {
    const currentSearchText = localStorage.getItem(SEARCH_TEXT_OXY) || '';
    const newSearchText = this.state.searchText;

    if (!initialLoad && currentSearchText === newSearchText) {
      return;
    }

    localStorage.setItem(SEARCH_TEXT_OXY, this.state.searchText);

    this.setState({ isLoading: true });

    const { characters } = await getCharacters({ name: this.state.searchText });

    this.setState({
      characters: characters,
      isLoading: false,
    });
  };

  componentDidMount() {
    this.handleSearchLS(true);
  }
  render(): React.ReactNode {
    if (this.state.counter === 1) {
      throw new Error();
    }

    return (
      <>
        <button
          style={{ position: 'absolute', top: '50px', right: '8%' }}
          onClick={this.handleClickError}
        >
          Simulate Error
        </button>
        <img src="./naruto-logo.png" alt="naruto" />
        <SearchBar
          searchText={this.state.searchText}
          handleSearch={this.handleSearch}
          handleButtonClick={() => this.handleSearchLS(false)}
        />
        <CardList
          cards={this.state.characters}
          isLoading={this.state.isLoading}
        />
      </>
    );
  }
}

export default App;
