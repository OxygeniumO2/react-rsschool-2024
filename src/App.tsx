import { createContext, useState } from 'react';
import './App.css';
import { SearchBar } from './components/SearchBar/SearchBar';
import { CardListSection } from './components/CardListSection/CardListSection';
import { Flyout } from './components/flyout/Flyout';
import { THEME_OXY } from './constants/localStorageKeys';

export const themeContext = createContext('light');

export const App = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem(THEME_OXY) || 'light'
  );

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
          <SearchBar />
          <CardListSection />
          <Flyout />
        </div>
      </div>
    </themeContext.Provider>
  );
};
