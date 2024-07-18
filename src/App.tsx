import { useEffect } from 'react';
import './App.css';
import { SearchBar } from './components/SearchBar/SearchBar';
import { useSearchTextLS } from './customHooks/useSearchTextLS';
import { CardListSection } from './components/CardListSection/CardListSection';
import { useNavigate, useParams } from 'react-router-dom';
import { Flyout } from './components/flyout/Flyout';

export const App = () => {
  const [searchText, setSearchText] = useSearchTextLS();

  const params = useParams();

  const navigate = useNavigate();

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
  };

  useEffect(() => {
    if (params.cardIndex) {
      navigate(
        `/search/name="${searchText}"/${params.page}/${params.cardIndex}`
      );
    } else {
      navigate(`/search/name="${searchText}"/${params.page}`);
    }
  }, []);

  return (
    <div data-testid="app">
      <img className="logo" src="/naruto-logo.png" alt="naruto" />
      <SearchBar
        searchText={searchText}
        handleSearch={handleSearch}
        handleButtonClick={() => {
          handleSearch(searchText);
          navigate(`/search/name="${searchText}"/1`);
        }}
      />
      <CardListSection />
      <Flyout />
    </div>
  );
};
