import { createContext, useEffect, useState } from 'react';
import './App.css';
import { SearchBar } from './components/SearchBar/SearchBar';
import { useSearchTextLS } from './customHooks/useSearchTextLS';
import { CardListSection } from './components/CardListSection/CardListSection';
import { useNavigate, useParams } from 'react-router-dom';
import { Flyout } from './components/flyout/Flyout';
import { THEME_OXY } from './constants/localStorageKeys';

export const themeContext = createContext('light');

export const App = () => {
  const [searchText, setSearchText] = useSearchTextLS();
  const [theme, setTheme] = useState(
    localStorage.getItem(THEME_OXY) || 'light'
  );

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
    <themeContext.Provider value={theme}>
      <div data-testid="app" className={`app ${theme}`}>
        <div className="container">
          <button
            className="themeBtn"
            onClick={() => {
              setTheme(theme === 'light' ? 'dark' : 'light');
              localStorage.setItem(
                THEME_OXY,
                theme === 'light' ? 'dark' : 'light'
              );
            }}
          >
            {theme.toUpperCase()}
          </button>
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
      </div>
    </themeContext.Provider>
  );
};
