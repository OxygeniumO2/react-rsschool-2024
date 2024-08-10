import { ReactNode, useState } from 'react';
import { themeContext } from '../App';

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
