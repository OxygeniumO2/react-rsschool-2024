import styles from './searchBar.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';

export const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

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
