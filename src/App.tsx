import { createContext, useState } from 'react';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Flyout } from './components/flyout/Flyout';

export const themeContext = createContext({
  theme: 'light',
  changeTheme: () => {},
});

const App = () => {
  const [theme, setTheme] = useState('light');

  return (
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

        <Flyout />
      </div>
    </div>
  );
};

export default App;
