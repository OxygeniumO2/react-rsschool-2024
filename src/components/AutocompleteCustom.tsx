import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

type AutocompleteCustomProps = {
  handleAutoComplete: (value: string) => void;
};

export const AutocompleteCustom = ({
  handleAutoComplete,
}: AutocompleteCustomProps) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const countries = useSelector((state: RootState) => state.formData.countries);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    handleAutoComplete(value);

    if (value) {
      const filteredSuggestions = countries.filter((country: string) =>
        country.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (country: string) => {
    setInputValue(country);
    handleAutoComplete(country);
    setSuggestions([]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && suggestions.length > 0) {
      handleSelect(suggestions[0]);
    }
  };

  return (
    <div>
      <label htmlFor="countryComplete">Country</label>
      <input
        id="countryComplete"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((country, index) => (
            <li key={index} onClick={() => handleSelect(country)}>
              {country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
