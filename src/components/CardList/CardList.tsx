import React from 'react';
import styles from './cardList.module.css';
import { Character } from '../../services/getCharacters';
import Card from './Card/Card';
import Loader from '../Loader/Loader';

type CardListProps = {
  cards: Character[];
  isLoading: boolean;
};

class CardList extends React.Component<CardListProps> {
  render() {
    if (this.props.isLoading) {
      return <Loader />;
    }
    return (
      <div className={styles.cardList}>
        {this.props.cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    );
  }
}

export default CardList;
