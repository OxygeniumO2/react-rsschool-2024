import { useEffect, useState } from 'react';
import './App.css';
import { Character, GetCharactersResp, narutoAPI } from './services/narutoApi';
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
  const [detailedCard, setDetailedCard] = useState<Character | null>(null);

  const params = useParams();

  const navigate = useNavigate();

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
  };

  const handleDetailedCard = (card: Character | null) => {
    setDetailedCard(card);
  };

  const handleCharactersData = async (
    page: number = 1,
    reset: boolean = false,
    name: string = ''
  ) => {
    setIsLoading(() => true);

    const newCharactersData = await narutoAPI.getCharacters({
      name,
      page,
    });
    setCharactersData(newCharactersData);

    const cardIndexValue = params.cardIndex
      ? parseInt(params.cardIndex.split('=')[1], 10)
      : null;

    setIsLoading(() => false);

    if (cardIndexValue && reset) {
      setDetailedCard(newCharactersData.characters[cardIndexValue - 1]);
      navigate(`/search/${page}/details=${cardIndexValue}`);
    } else {
      navigate(`/search/${page}`);
      setDetailedCard(null);
    }

    localStorage.setItem(SEARCH_TEXT_OXY, searchText);
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

    handleCharactersData(currentPage, true, searchText);
  }, []);

  return (
    <>
      <img className="logo" src="/naruto-logo.png" alt="naruto" />
      <SearchBar
        searchText={searchText}
        handleSearch={handleSearch}
        handleButtonClick={() => handleCharactersData(1, false, searchText)}
      />
      <CardListSection
        charactersData={charactersData}
        isLoading={isLoading}
        handleCharactersData={handleCharactersData}
        detailedCard={detailedCard}
        handleDetailedCard={handleDetailedCard}
      />
    </>
  );
};
