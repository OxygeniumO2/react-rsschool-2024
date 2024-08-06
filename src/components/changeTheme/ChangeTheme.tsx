'use client';

import { useContext } from 'react';
import { themeContext } from '../../App';

export const ChangeTheme = () => {
  const { theme, changeTheme } = useContext(themeContext);

  return (
    <button className="themeBtn" onClick={() => changeTheme()}>
      {theme.toUpperCase()}
    </button>
  );
};
