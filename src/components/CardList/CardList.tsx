import styles from './cardList.module.css';
import { Character } from '../../services/narutoApi';
import { Card } from './Card/Card';
import { DetailedCard } from './DetailedCard/DetailedCard';
import { useContext } from 'react';
import { themeContext } from '../../App';
import { getThemeClass } from '../../utils/getThemeClass';
import { useRouter } from 'next/router';

type CardListProps = {
  cards: Character[];
  detail: Character;
};

export const CardList = ({ cards, detail }: CardListProps) => {
  const router = useRouter();
  const { name, page } = router.query;
  const theme = useContext(themeContext);
  const handleCloseDetailedCard = () => {
    router.push(`/search/${name}/${page}`);
  };

  const handleNewDetailedCard = (index: number) => {
    router.push(`/search/${name}/${page}?details=${index + 1}`);
  };

  if (cards.length === 0) {
    return <h2 className={styles.empty}>No characters found</h2>;
  }

  return (
    <div className={styles.cardListSection}>
      <div
        className={`${styles.cardList} ${getThemeClass(theme, styles)}`}
        onClick={handleCloseDetailedCard}
      >
        {cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            index={index}
            handleDetailedCard={handleNewDetailedCard}
          />
        ))}
      </div>
      {detail && (
        <DetailedCard
          detail={detail}
          handleCloseDetailedCard={handleCloseDetailedCard}
        />
      )}
    </div>
  );
};
