import { useEffect, useState } from 'react';
import './App.css';
import { GetCharactersResp, narutoAPI } from './services/narutoApi';
import { SearchBar } from './components/SearchBar/SearchBar';
import { useSearchTextLS } from './customHooks/useSearchTextLS';
import { CardListSection } from './components/CardListSection/CardListSection';
import { useNavigate, useParams } from 'react-router-dom';
import { DEFAULT_NUMBER_OF_ITEMS } from './constants/constants';
import { SEARCH_TEXT_OXY } from './constants/localStorageKeys';

export const App = () => {
  const [searchText, setSearchText] = useSearchTextLS();
  const [charactersData, setCharactersData] =
    useState<GetCharactersResp | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  const navigate = useNavigate();

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
  };

  const handleCharactersData = async (page: number = 1) => {
    setIsLoading(() => true);

    const newCharactersData = await narutoAPI.getCharacters({
      name: searchText,
      page,
    });
    setCharactersData(newCharactersData);
    navigate(`/search/${page}`);

    localStorage.setItem(SEARCH_TEXT_OXY, searchText);

    setIsLoading(() => false);
  };

  useEffect(() => {
    const currentPage = Number(params.page);
    const cardIndexValue = params.cardIndex
      ? parseInt(params.cardIndex.split('=')[1], 10)
      : null;

    if (
      isNaN(currentPage) ||
      currentPage < 1 ||
      (cardIndexValue !== null &&
        (isNaN(cardIndexValue) || cardIndexValue > DEFAULT_NUMBER_OF_ITEMS))
    ) {
      navigate('/not-found');
      setIsLoading(() => false);
      return;
    }

    handleCharactersData(currentPage);
  }, []);

  return (
    <>
      <img className="logo" src="/naruto-logo.png" alt="naruto" />
      <SearchBar
        searchText={searchText}
        handleSearch={handleSearch}
        handleButtonClick={() => handleCharactersData()}
      />
      <CardListSection
        charactersData={charactersData}
        isLoading={isLoading}
        handleCharactersData={handleCharactersData}
      />
    </>
  );
};
