import styles from './cardList.module.css';
import { Character, narutoAPI } from '../../services/narutoApi';
import { Card } from './Card/Card';
import { useNavigate } from 'react-router-dom';
import { DetailedCard } from './DetailedCard/DetailedCard';
import { useState } from 'react';
import { Loader } from '../Loader/Loader';

type CardListProps = {
  cards: Character[];
};

export const CardList = ({ cards }: CardListProps) => {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (cards.length === 0) {
    return <div className={styles.empty}>No characters found</div>;
  }

  const handleCloseDetailedCard = () => {
    setSelectedCard(null);
  };

  const handleDetailedCard = async (
    cardId: string,
    page: number,
    index: number
  ) => {
    if (cardId === selectedCard?.id) {
      setSelectedCard(null);
      navigate(`/search/${page}`);
      return;
    }

    setIsLoading(() => true);
    const cardData = await narutoAPI.getCharacterById(cardId);
    setSelectedCard(cardData);
    navigate(`/search/${page}/${index + 1}`);
    setIsLoading(() => false);
  };

  return (
    <div className={styles.cardListSection}>
      <div className={styles.cardList} onClick={handleCloseDetailedCard}>
        {cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            index={index}
            handleDetailedCard={handleDetailedCard}
          />
        ))}
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        selectedCard && (
          <DetailedCard
            character={selectedCard}
            handleCloseDetailedCard={handleCloseDetailedCard}
          />
        )
      )}
    </div>
  );
};
