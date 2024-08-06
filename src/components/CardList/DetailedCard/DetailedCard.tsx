'use client';
import styles from './detailedCard.module.css';
import { Character } from '../../../services/narutoApi';
import { useContext } from 'react';
import { themeContext } from '../../../App';
import { getThemeClass } from '../../../utils/getThemeClass';
import { usePathname, useRouter } from 'next/navigation';

type DetailedCardProps = {
  data: Character | null;
};

export const DetailedCard = ({ data }: DetailedCardProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const { theme } = useContext(themeContext);

  if (!data) {
    return <h1 data-testid="detailed-card">Character not found</h1>;
  }

  const decodedPathName = decodeURIComponent(pathName);

  const charName = decodedPathName
    .split('=')[1]
    .replace(/"/g, '')
    .split('/')[0];

  const page = decodedPathName.split('/')[3];

  const handleCloseDetailedCard = () => {
    router.push(`/search/name="${charName}"/${page}`), { scroll: false };
  };

  const { images, name, debut, personal } = data;
  const imageUrl = images.length > 0 ? images[0] : '/no-image.png';

  return (
    <div
      className={`${styles.detailedCardContainer} ${getThemeClass(theme, styles)}`}
      data-testid="detailed-card"
    >
      <div className={styles.cardImgContainer}>
        <img className={styles.cardImg} src={imageUrl} alt="cardImg" />
      </div>
      <div className={styles.cardRightContainer}>
        <h3 className={styles.cardName}>{name}</h3>
        <div className={styles.cardInfo}>
          {personal?.sex && (
            <p>
              <b>Sex:</b>{' '}
              {personal?.sex.includes('svg') ? 'Various' : personal?.sex}
            </p>
          )}
          {personal &&
            Object.entries(personal).map(([key, value]) => {
              if (key === 'sex' || key === 'titles') {
                return null;
              }
              if (typeof value === 'object' && !Array.isArray(value)) {
                return null;
              }
              if (Array.isArray(value)) {
                value = value.join(', ');
              }
              return (
                <p key={key}>
                  <b>{key.charAt(0).toUpperCase() + key.slice(1)}:</b> {value}
                </p>
              );
            })}
          {debut?.appearsIn && (
            <p>
              <b>Appears In:</b> {debut?.appearsIn}
            </p>
          )}
          <button
            className={styles.cardInfoBtn}
            onClick={handleCloseDetailedCard}
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
