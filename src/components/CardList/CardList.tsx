import styles from './cardList.module.css';
import { Character } from '../../services/narutoApi';
import { Card } from './Card/Card';

type CardListProps = {
  cards: Character[];
};

export const CardList = ({ cards }: CardListProps) => {
  if (cards.length === 0) {
    return <div className={styles.empty}>No characters found</div>;
  }

  return (
    <div className={styles.cardList}>
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
};
