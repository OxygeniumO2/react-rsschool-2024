import styles from './detailedCard.module.css';
import { apiSlice } from '../../../services/narutoApi';
import { skipToken } from '@reduxjs/toolkit/query';
import { Loader } from '../../Loader/Loader';

type DetailedCardProps = {
  cardId: string | null;
  handleCloseDetailedCard: () => void;
};

export const DetailedCard = ({
  cardId,
  handleCloseDetailedCard,
}: DetailedCardProps) => {
  const {
    data: character,
    isLoading,
    isFetching,
  } = apiSlice.useGetCharacterByIdQuery(cardId ?? skipToken);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  const { images, name, debut, personal } = character;
  const imageUrl = images.length > 0 ? images[0] : '/no-image.png';

  return (
    <div className={styles.detailedCardContainer} data-testid="detailed-card">
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
