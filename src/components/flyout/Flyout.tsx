import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './flyout.module.css';
import { clearCards } from '../../store/selectedCardsSlice';
import { Character } from '../../services/narutoApi';
import { useContext } from 'react';
import { themeContext } from '../../App';
import { getThemeClass } from '../../utils/getThemeClass';

export function convertToCSV(objArray: Character[]) {
  const csvData = objArray.reduce((acc, item) => {
    return (acc += `Name: ${item.name}, Sex: ${item.personal?.sex || 'no data'}, Clan: ${item.personal?.clan || 'no data'}, Classification: ${item.personal?.classification || 'no data'}, Appears In: ${item.debut?.appearsIn || 'no data'}\n`);
  }, '');
  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  return url;
}

export const Flyout = () => {
  const dispatch = useDispatch();
  const theme = useContext(themeContext);
  const selectedCards = useSelector(
    (state: RootState) => state.selectedCards.selectedCards
  );

  return (
    <div
      className={`${styles.flyout} ${selectedCards.length > 0 ? styles.visible : ''} ${getThemeClass(theme, styles)}`}
    >
      <h2 className={styles.flyoutTitle}>
        {selectedCards.length} items are selected
      </h2>
      <button onClick={() => dispatch(clearCards())}>Unselect all</button>
      <a
        className={`${selectedCards.length === 0 ? styles.disabledDownload : ''}`}
        href={convertToCSV(selectedCards)}
        download={`${selectedCards.length}_naruto_characters.csv`}
      >
        Download
      </a>
    </div>
  );
};
