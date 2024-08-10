import styles from './detailedCard.module.css';
import { Character } from '../../../services/narutoApi';
import { useContext } from 'react';
import { themeContext } from '../../../App';
import { getThemeClass } from '../../../utils/getThemeClass';

type DetailedCardProps = {
  character: Character | null;
  handleCloseDetailedCard: () => void;
};

export const DetailedCard = ({
  character,
  handleCloseDetailedCard,
}: DetailedCardProps) => {
  const { theme } = useContext(themeContext);

  if (!character) {
    return <div>No character found</div>;
  }

  const { images, name, debut, personal } = character;
  const imageUrl = images.length > 0 ? images[0] : '/no-image.png';

  return (
    <div
      className={`${styles.detailedCardContainer} ${getThemeClass(theme, styles)}`}
      data-testid="detailed-card"
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
          {personal &&
            Object.entries(personal).map(([key, value]) => {
              if (key === 'sex' || key === 'titles') {
                return null;
              }
              if (typeof value === 'object' && !Array.isArray(value)) {
                return null;
              }
              if (Array.isArray(value)) {
                value = value.join(', ');
              }
              return (
                <p key={key}>
                  <b>{key.charAt(0).toUpperCase() + key.slice(1)}:</b> {value}
                </p>
              );
            })}
          {debut?.appearsIn && (
            <p>
              <b>Appears In:</b> {debut?.appearsIn}
            </p>
          )}
          <button onClick={handleCloseDetailedCard} type="button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
