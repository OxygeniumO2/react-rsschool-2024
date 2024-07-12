import styles from './searchBar.module.css';

type SearchBarProps = {
  searchText: string;
  handleSearch: (searchText: string) => void;
  handleButtonClick: () => void;
};

export const SearchBar = ({
  searchText,
  handleSearch,
  handleButtonClick,
}: SearchBarProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value.trim();
    handleSearch(searchText);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleButtonClick();
    }
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
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleButtonClick} type="button">
        Search
      </button>
    </div>
  );
};
