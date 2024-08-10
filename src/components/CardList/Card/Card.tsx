import styles from './card.module.css';
import { Character } from '../../../services/narutoApi';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCard } from '../../../store/selectedCardsSlice';
import { RootState } from '../../../store/store';
import { useContext } from 'react';
import { themeContext } from '../../../App';
import { getThemeClass } from '../../../utils/getThemeClass';

type CardProps = {
  card: Character;
  handleDetailedCard: (cardId: string, event: React.MouseEvent) => void;
};

export const Card = ({ card, handleDetailedCard }: CardProps) => {
  const { theme } = useContext(themeContext);
  const { images, name, debut, personal } = card;
  const imageUrl = images.length > 0 ? images[0] : '/no-image.png';

  const dispatch = useDispatch();
  const selectedCards = useSelector(
    (state: RootState) => state.selectedCards.selectedCards
  );

  const isActiveCard = selectedCards.includes(card);

  return (
    <div
      className={`${styles.cardContainer} ${getThemeClass(theme, styles)}`}
      onClick={(event) => handleDetailedCard(card.id, event)}
    >
      <div className={styles.cardImgContainer}>
        <img className={styles.cardImg} src={imageUrl} alt="cardImg" />
      </div>
      <div className={styles.cardRightContainer}>
        <h3>{name}</h3>
        <div className={styles.cardInfo}>
          {personal?.sex && (
            <p>
              <b>Sex:</b>{' '}
              {personal?.sex.includes('svg') ? 'Various' : personal?.sex}
            </p>
          )}
          {personal?.clan && (
            <p>
              <b>Clan:</b> {personal?.clan}
            </p>
          )}
          {personal?.classification && (
            <p>
              <b>Classification:</b>{' '}
              {Array.isArray(personal.classification)
                ? personal.classification.join(', ')
                : personal.classification}
            </p>
          )}
          {debut?.appearsIn && (
            <p>
              <b>Appears In:</b> {debut?.appearsIn}
            </p>
          )}
        </div>
        <label
          className={styles.cardLabel}
          onClick={(e) => e.stopPropagation()}
        >
          {isActiveCard ? 'Unselect' : 'Select'}
          <input
            className={styles.cardCheckbox}
            type="checkbox"
            onChange={() => dispatch(setSelectedCard(card))}
            checked={isActiveCard}
          />
        </label>
      </div>
    </div>
  );
};
