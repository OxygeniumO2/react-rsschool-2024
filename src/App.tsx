import { createContext, useState } from 'react';
import { SearchBar } from './components/SearchBar/SearchBar';
import { CardListSection } from './components/CardListSection/CardListSection';
import { Flyout } from './components/flyout/Flyout';
import { THEME_OXY } from './constants/localStorageKeys';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Character, GetCharactersResp } from './services/narutoApi';

export const themeContext = createContext('light');

type AppProps = {
  charactersResp: GetCharactersResp;
  detail: Character;
};

const App = ({ charactersResp, detail }: AppProps) => {
  const [theme, setTheme] = useState('light');

  return (
    <Provider store={store}>
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
            <CardListSection charactersResp={charactersResp} detail={detail} />
            <Flyout />
          </div>
        </div>
      </themeContext.Provider>
    </Provider>
  );
};

export default App;
