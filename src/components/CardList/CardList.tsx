import styles from './cardList.module.css';
import { Character, narutoAPI } from '../../services/narutoApi';
import { Card } from './Card/Card';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailedCard } from './DetailedCard/DetailedCard';
import { useState } from 'react';
import { Loader } from '../Loader/Loader';

type CardListProps = {
  cards: Character[];
  detailedCard: Character | null;
  handleDetailedCard: (card: Character | null) => void;
};

export const CardList = ({
  cards,
  detailedCard,
  handleDetailedCard,
}: CardListProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { page } = useParams();

  if (cards.length === 0) {
    return <h2 className={styles.empty}>No characters found</h2>;
  }

  const handleCloseDetailedCard = () => {
    handleDetailedCard(null);
    navigate(`/search/${page}`);
  };

  const handleNewDetailedCard = async (
    cardId: string,
    page: number,
    index: number
  ) => {
    if (cardId === detailedCard?.id) {
      handleDetailedCard(null);
      navigate(`/search/${page}`);
      return;
    }

    setIsLoading(() => true);
    const cardData = await narutoAPI.getCharacterById(cardId);
    handleDetailedCard(cardData);
    navigate(`/search/${page}/details=${index + 1}`);
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
            handleDetailedCard={handleNewDetailedCard}
          />
        ))}
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        detailedCard && (
          <DetailedCard
            character={detailedCard}
            handleCloseDetailedCard={handleCloseDetailedCard}
          />
        )
      )}
    </div>
  );
};
