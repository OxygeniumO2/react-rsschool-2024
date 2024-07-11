import styles from './card.module.css';
import { Character } from '../../../services/narutoApi';
import { useParams } from 'react-router-dom';

type CardProps = {
  card: Character;
  index: number;
  handleDetailedCard: (cardId: string, page: number, index: number) => void;
};

export const Card = ({ card, index, handleDetailedCard }: CardProps) => {
  const { images, name, debut, personal } = card;
  const imageUrl = images.length > 0 ? images[0] : '/no-image.png';

  const params = useParams<{ page: string }>();

  const pageNumber = Number(params.page);

  return (
    <div
      className={styles.cardContainer}
      onClick={() => handleDetailedCard(card.id, pageNumber, index)}
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
      </div>
    </div>
  );
};
