import styles from './cardList.module.css';
import { Character } from '../../services/narutoApi';
import { Card } from './Card/Card';
import { useContext } from 'react';
import { themeContext } from '../../App';
import { getThemeClass } from '../../utils/getThemeClass';
import { useNavigate, useParams } from '@remix-run/react';

type CardListProps = {
  cards: Character[];
};

export const CardList = ({ cards }: CardListProps) => {
  const navigate = useNavigate();
  const { page, name, details } = useParams();
  const { theme } = useContext(themeContext);
  const handleCloseDetailedCard = () => {
    if (details) {
      navigate(`/search/${name}/${page}`, { preventScrollReset: true });
    }
  };

  const handleNewDetailedCard = (
    newCardId: string,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();

    if (details && details.split('=')[1] === newCardId.toString()) {
      navigate(`/search/${name}/${page}`, { preventScrollReset: true });
      return;
    }
    navigate(`/search/${name}/${page}/details=${newCardId}`, {
      preventScrollReset: true,
    });
  };

  if (cards.length === 0) {
    return <h2 className={styles.empty}>No characters found</h2>;
  }

  return (
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
  );
};
