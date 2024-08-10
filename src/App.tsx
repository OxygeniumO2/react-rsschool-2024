import { createContext, useContext } from 'react';
import './App.css';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Flyout } from './components/flyout/Flyout';

export const themeContext = createContext({
  theme: 'light',
  changeTheme: () => {},
});

export const AppModify = ({ children }: { children: React.ReactNode }) => {
  const { theme, changeTheme } = useContext(themeContext);

  return (
    <div data-testid="app" className={`app ${theme}`}>
      <div className="container">
        <button
          className="themeBtn"
          onClick={() => {
            changeTheme();
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
  );
};
