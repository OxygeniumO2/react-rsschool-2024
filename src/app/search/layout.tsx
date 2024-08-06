'use client';
import { ReactNode, useContext } from 'react';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { Flyout } from '../../components/flyout/Flyout';
import { themeContext } from '../../App';
import { ChangeTheme } from '../../components/changeTheme/ChangeTheme';

export default function SearchLayout({ children }: { children: ReactNode }) {
  const { theme } = useContext(themeContext);
  return (
    <>
      <div data-testid="app" className={`app ${theme}`}>
        <div className="container">
          <ChangeTheme />{' '}
          <img className="logo" src="/naruto-logo.png" alt="naruto" />
          <SearchBar /> {children}
          <Flyout />
        </div>
      </div>
    </>
  );
}
