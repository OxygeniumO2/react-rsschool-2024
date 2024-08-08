import { ReactNode, useContext, useState } from 'react';
import { themeContext } from '../../App';
import { SearchBar } from '../SearchBar/SearchBar';
import { Flyout } from '../flyout/Flyout';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { ErrorComponent } from '../ErrorBoundary/ErrorComponent/ErrorComponent';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState('light');

  const changeTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <themeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </themeContext.Provider>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, changeTheme } = useContext(themeContext);
  return (
    <>
      <ErrorBoundary fallback={<ErrorComponent />}>
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
      </ErrorBoundary>
    </>
  );
}
