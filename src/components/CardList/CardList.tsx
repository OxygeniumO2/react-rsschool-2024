import styles from './cardList.module.css';
import { Character } from '../../services/narutoApi';
import { Card } from './Card/Card';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailedCard } from './DetailedCard/DetailedCard';
import { useState } from 'react';

type CardListProps = {
  cards: Character[];
};

export const CardList = ({ cards }: CardListProps) => {
  const navigate = useNavigate();
  const { page, name } = useParams();
  const [showDetailedCard, setShowDetailedCard] = useState(false);
  const [cardId, setCardId] = useState<string | null>(null);
  const handleCloseDetailedCard = () => {
    setShowDetailedCard(false);
    setCardId(null);
    navigate(`/search/${name}/${page}`);
  };

  const handleNewDetailedCard = (
    newCardId: string,
    index: number,
    event: React.MouseEvent
  ) => {
    if (showDetailedCard && cardId === newCardId) {
      setShowDetailedCard(false);
      return;
    }
    event.stopPropagation();
    setCardId(newCardId);
    setShowDetailedCard(true);
    navigate(`/search/${name}/${page}/details=${index + 1}`);
  };

  if (cards.length === 0) {
    return <h2 className={styles.empty}>No characters found</h2>;
  }

  return (
    <div className={styles.cardListSection}>
      <div className={styles.cardList} onClick={handleCloseDetailedCard}>
        {cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            index={index}
            handleDetailedCard={handleNewDetailedCard}
          />
        ))}
      </div>
      {showDetailedCard && (
        <DetailedCard
          cardId={cardId}
          handleCloseDetailedCard={handleCloseDetailedCard}
        />
      )}
    </div>
  );
};
