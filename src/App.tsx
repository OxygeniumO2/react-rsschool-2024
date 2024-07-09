import { useEffect, useState } from 'react';
import './App.css';
import { SEARCH_TEXT_OXY } from './constants/localStorageKeys';
import { GetCharactersResp, narutoAPI } from './services/narutoApi';
import { SearchBar } from './components/SearchBar/SearchBar';
import { useSearchTextLS } from './customHooks/useSearchTextLS';
import { CardListSection } from './components/CardListSection/CardListSection';

export const App = () => {
  const [searchText, setSearchText] = useSearchTextLS();
  const [charactersData, setCharactersData] =
    useState<GetCharactersResp | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
  };

  const handleCharactersData = async (page: number) => {
    setIsLoading(() => true);

    const newCharactersData = await narutoAPI.getCharacters({
      page,
    });
    setCharactersData(newCharactersData);

    setIsLoading(() => false);
  };

  const handleSearchLS = async (initialLoad: boolean = false) => {
    const currentSearchText = localStorage.getItem(SEARCH_TEXT_OXY) || '';
    const newSearchText = searchText;

    if (!initialLoad && currentSearchText === newSearchText) {
      return;
    }

    localStorage.setItem(SEARCH_TEXT_OXY, searchText);

    setIsLoading(() => true);

    const charactersData = await narutoAPI.getCharacters({
      name: searchText,
    });

    setCharactersData(charactersData);

    setIsLoading(() => false);
  };

  useEffect(() => {
    handleSearchLS(true);
  }, []);

  return (
    <>
      <img src="./naruto-logo.png" alt="naruto" />
      <SearchBar
        searchText={searchText}
        handleSearch={handleSearch}
        handleButtonClick={() => handleSearchLS()}
      />
      <CardListSection
        charactersData={charactersData}
        isLoading={isLoading}
        handleCharactersData={handleCharactersData}
      />
    </>
  );
};
