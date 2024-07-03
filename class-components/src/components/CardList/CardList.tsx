import React from 'react';
import { Character } from '../../services/getCharacters';
import Card from './Card/Card';

type CardListProps = {
  cards: Character[];
};

class CardList extends React.Component<CardListProps> {
  render() {
    return (
      <div>
        {this.props.cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    );
  }
}

export default CardList;
