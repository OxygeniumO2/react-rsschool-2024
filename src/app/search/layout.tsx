'use client';
import { ReactNode, useContext } from 'react';
import { themeContext } from '../../App';
import { ChangeTheme } from '../../components/changeTheme/ChangeTheme';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { Flyout } from '../../components/flyout/Flyout';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import { ErrorComponent } from '../../components/ErrorBoundary/ErrorComponent/ErrorComponent';

export default function SearchLayout({ children }: { children: ReactNode }) {
  const { theme } = useContext(themeContext);

  return (
    <ErrorBoundary fallback={<ErrorComponent />}>
      <div data-testid="app" className={`app ${theme}`}>
        <div className="container">
          <ChangeTheme />{' '}
          <img className="logo" src="/naruto-logo.png" alt="naruto" />
          <SearchBar />
          {children}
          <Flyout />
        </div>
      </div>
    </ErrorBoundary>
  );
}
