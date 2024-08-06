'use client';
import styles from './cardList.module.css';
import { Character } from '../../services/narutoApi';
import { Card } from './Card/Card';
import { useContext } from 'react';
import { themeContext } from '../../App';
import { getThemeClass } from '../../utils/getThemeClass';
import { usePathname, useRouter } from 'next/navigation';

type CardListProps = {
  cards: Character[];
};

export const CardList = ({ cards }: CardListProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const { theme } = useContext(themeContext);

  const decodedPathName = decodeURIComponent(pathName);

  const charName = decodedPathName
    .split('=')[1]
    .replace(/"/g, '')
    .split('/')[0];

  const page = decodedPathName.split('/')[3];

  const handleCloseDetailedCard = () => {
    router.push(`/search/name="${charName}"/${page}`, {
      scroll: false,
    });
  };

  const handleNewDetailedCard = (index: string) => {
    router.push(`/search/name="${charName}"/${page}/details=${index}`, {
      scroll: false,
    });
  };

  if (cards.length === 0) {
    return <h2 className={styles.empty}>No characters found</h2>;
  }

  return (
    <div
      className={`${styles.cardList} ${getThemeClass(theme, styles)}`}
      onClick={(e) => {
        e.stopPropagation();
        handleCloseDetailedCard();
      }}
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
