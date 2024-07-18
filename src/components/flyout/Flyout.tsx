import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './flyout.module.css';
import { clearCards } from '../../store/selectedCardsSlice';
import { Character } from '../../services/narutoApi';
import { useContext } from 'react';
import { themeContext } from '../../App';
import { getThemeClass } from '../../utils/getThemeClass';

function convertToCSV(objArray: Character[]) {
  return objArray.reduce((acc, item) => {
    return (acc += `Name: ${item.name}, ${item.personal?.sex || ''}, ${item.personal?.clan || ''}, ${item.personal?.classification || ''}, ${item.debut?.appearsIn || ''}\n`);
  }, '');
}

function downloadCSV(csv: string, filename: string) {
  const csvFile = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (link.download !== undefined) {
    const url = URL.createObjectURL(csvFile);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export const Flyout = () => {
  const dispatch = useDispatch();
  const theme = useContext(themeContext);
  const selectedCards = useSelector(
    (state: RootState) => state.selectedCards.selectedCards
  );

  function handleDownload() {
    const csv = convertToCSV(selectedCards);
    const count = selectedCards.length;
    const filename = `${count}_naruto_characters.csv`;
    downloadCSV(csv, filename);
  }

  return (
    <div
      className={`${styles.flyout} ${selectedCards.length > 0 ? styles.visible : ''} ${getThemeClass(theme, styles)}`}
    >
      <h2>{selectedCards.length} items are selected</h2>
      <button onClick={() => dispatch(clearCards())}>Unselect all</button>
      <button disabled={selectedCards.length === 0} onClick={handleDownload}>
        Download
      </button>
    </div>
  );
};
