'use client';
import styles from './searchBar.module.css';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export const SearchBar = () => {
  const router = useRouter();
  const pathName = usePathname();

  const decodedPathName = decodeURIComponent(pathName);
  const [searchText, setSearchText] = useState(
    decodedPathName.split('=')[1].replace(/"/g, '').split('/')[0] || ''
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value.trim();
    setSearchText(searchText);
  };

  return (
    <div className={styles.searchBar}>
      <input
        className={styles.searchInput}
        type="text"
        name=""
        id=""
        placeholder="search"
        value={searchText}
        onChange={handleInputChange}
      />
      <button
        onClick={() => router.push(`/search/name="${searchText}"/1`)}
        type="button"
      >
        Search
      </button>
    </div>
  );
};
