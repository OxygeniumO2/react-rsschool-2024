import React from 'react';
import styles from './cardList.module.css';
import { Character } from '../../services/getCharacters';
import Card from './Card/Card';

type CardListProps = {
  cards: Character[];
};

class CardList extends React.Component<CardListProps> {
  shouldComponentUpdate(nextProps: CardListProps) {
    return nextProps.cards !== this.props.cards;
  }

  render() {
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
