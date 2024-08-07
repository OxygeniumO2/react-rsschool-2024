import { useState } from 'react';
import { themeContext } from '../../App';
import { SearchBar } from '../SearchBar/SearchBar';
import { Flyout } from '../flyout/Flyout';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light');
  return (
    <>
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
            {children}
            <Flyout />
          </div>
        </div>
      </themeContext.Provider>
    </>
  );
}
