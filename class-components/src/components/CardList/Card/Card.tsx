import React from 'react';
import styles from './card.module.css';
import { Character } from '../../../services/getCharacters';

type CardProps = {
  card: Character;
};

class Card extends React.Component<CardProps> {
  render() {
    const { images, name, debut, personal } = this.props.card;
    const imageUrl = images.length > 0 ? images[0] : './no-image.png';

    return (
      <div className={styles.cardContainer}>
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
  }
}

export default Card;
