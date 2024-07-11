import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SEARCH_TEXT_OXY } from '../constants/localStorageKeys';

export function useSearchTextLS(): [string, Dispatch<SetStateAction<string>>] {
  const [text, setText] = useState(() => {
    return localStorage.getItem(SEARCH_TEXT_OXY) || '';
  });

  useEffect(() => {
    localStorage.setItem(SEARCH_TEXT_OXY, text);
  }, [text]);

  return [text, setText];
}
