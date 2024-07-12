import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { SEARCH_TEXT_OXY } from '../constants/localStorageKeys';

export function useSearchTextLS(): [string, Dispatch<SetStateAction<string>>] {
  const [text, setText] = useState(() => {
    return localStorage.getItem(SEARCH_TEXT_OXY) || '';
  });

  const textRef = useRef(text);

  useEffect(() => {
    textRef.current = text;
  }, [text]);

  useEffect(() => {
    return () => {
      localStorage.setItem(SEARCH_TEXT_OXY, textRef.current);
    };
  }, []);

  return [text, setText];
}
