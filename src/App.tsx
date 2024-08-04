import { createContext, useState } from 'react';
import { SearchBar } from './components/SearchBar/SearchBar';
import { CardListSection } from './components/CardListSection/CardListSection';
import { Flyout } from './components/flyout/Flyout';

export const themeContext = createContext('light');

const App = () => {
  const [theme, setTheme] = useState('light');

  return (
    <themeContext.Provider value={theme}>
      <div data-testid="app" className={`app ${theme}`}>
        <div className="container">
          <button
            className="themeBtn"
            onClick={() => {
              setTheme(theme === 'light' ? 'dark' : 'light');
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

export default App;
