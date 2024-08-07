import styles from './detailedCard.module.css';
import { apiSlice, Character } from '../../../services/narutoApi';
import { useContext } from 'react';
import { themeContext } from '../../../App';
import { getThemeClass } from '../../../utils/getThemeClass';
import { useRouter } from 'next/router';

export const DetailedCard = () => {
  const { theme } = useContext(themeContext);
  const router = useRouter();
  const { name, page, details } = router.query;

  const result = apiSlice.useGetCharacterByIdQuery(
    details?.toString().split('=')[1] || '1',
    {
      skip: router.isFallback || !details,
    }
  );

  let charName = '';

  if (name && typeof name === 'string') {
    charName = name?.split('=')[1].replace(/"/g, '');
  }

  const { data } = result;

  if (!data) {
    return <h1 data-testid="detailed-card">Character not found</h1>;
  }

  const handleCloseDetailedCard = () => {
    router.push(`/search/name=${charName}/${page}`, undefined, {
      scroll: false,
    });
  };

  const { images, name: cardName, debut, personal } = data as Character;
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
        <h3 className={styles.cardName}>{cardName}</h3>
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
