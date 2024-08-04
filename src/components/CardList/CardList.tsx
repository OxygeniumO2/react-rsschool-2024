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
};

export const CardList = ({ cards }: CardListProps) => {
  const router = useRouter();
  const { name, page, details } = router.query;
  const theme = useContext(themeContext);
  const handleCloseDetailedCard = () => {
    router.push(`/search/${name}/${page}`, undefined, { scroll: false });
  };

  const handleNewDetailedCard = (index: string) => {
    if (details === index.toString()) {
      router.push(`/search/${name}/${page}`);
      return;
    }
    router.push(`/search/${name}/${page}?details=${index}`, undefined, {
      scroll: false,
    });
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
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleDetailedCard={handleNewDetailedCard}
          />
        ))}
      </div>
      {details && (
        <DetailedCard handleCloseDetailedCard={handleCloseDetailedCard} />
      )}
    </div>
  );
};
