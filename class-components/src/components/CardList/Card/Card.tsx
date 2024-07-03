import React from 'react';
import { Character } from '../../../services/getCharacters';

type CardProps = {
  card: Character;
};

class Card extends React.Component<CardProps> {
  render() {
    return <div>{this.props.card.name}</div>;
  }
}

export default Card;
