import { useNavigate, useParams } from 'react-router-dom';
import { useSearchTextLS } from '../../customHooks/useSearchTextLS';
import styles from './searchBar.module.css';
import { useEffect } from 'react';

export const SearchBar = () => {
  const [searchText, setSearchText] = useSearchTextLS();

  const navigate = useNavigate();
  const params = useParams();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value.trim();
    setSearchText(searchText);
  };

  useEffect(() => {
    if (params.cardIndex) {
      navigate(
        `/search/name="${searchText}"/${params.page}/${params.cardIndex}`
      );
    } else {
      navigate(`/search/name="${searchText}"/${params.page}`);
    }
  }, []);

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
