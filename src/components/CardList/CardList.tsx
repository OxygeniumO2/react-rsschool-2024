import styles from './cardList.module.css';
import { Character } from '../../services/narutoApi';
import Card from './Card/Card';

type CardListProps = {
  cards: Character[];
};

const CardList = ({ cards }: CardListProps) => {
  return (
    <div className={styles.cardList}>
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CardList;
