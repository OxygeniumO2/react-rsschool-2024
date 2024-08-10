import { useNavigate, useParams } from '@remix-run/react';
import styles from './searchBar.module.css';
import { useState } from 'react';

export const SearchBar = () => {
  const params = useParams();
  const charName = params.name?.split('"')[1];
  const [searchText, setSearchText] = useState(charName || '');

  const navigate = useNavigate();

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
        onClick={() => navigate(`/search/name="${searchText}"/1`)}
        type="button"
      >
        Search
      </button>
    </div>
  );
};
