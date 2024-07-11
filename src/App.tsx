import { useEffect, useState } from 'react';
import './App.css';
import { GetCharactersResp, narutoAPI } from './services/narutoApi';
import { SearchBar } from './components/SearchBar/SearchBar';
import { useSearchTextLS } from './customHooks/useSearchTextLS';
import { CardListSection } from './components/CardListSection/CardListSection';
import { useNavigate, useParams } from 'react-router-dom';

export const App = () => {
  const [searchText, setSearchText] = useSearchTextLS();
  const [charactersData, setCharactersData] =
    useState<GetCharactersResp | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { page } = useParams();
  const navigate = useNavigate();

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
  };

  const handleCharactersData = async (page: number) => {
    setIsLoading(() => true);

    const newCharactersData = await narutoAPI.getCharacters({
      name: searchText,
      page,
    });
    setCharactersData(newCharactersData);
    navigate(`/search/${page}`);

    setIsLoading(() => false);
  };

  const handleSearchLS = async (page: number = 1) => {
    setIsLoading(() => true);

    const charactersData = await narutoAPI.getCharacters({
      name: searchText,
      page,
    });

    navigate(`/search/${page}`);

    setCharactersData(charactersData);

    setIsLoading(() => false);
  };

  useEffect(() => {
    const currentPage = Number(page);

    if (isNaN(currentPage) || currentPage < 1) {
      navigate('/not-found');
      setIsLoading(() => false);
      return;
    }

    handleSearchLS(currentPage);
    navigate(`/search/${page}`, { replace: true });
  }, []);

  return (
    <>
      <img
        style={{ display: 'block', margin: '0 auto' }}
        src="/naruto-logo.png"
        alt="naruto"
      />
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
