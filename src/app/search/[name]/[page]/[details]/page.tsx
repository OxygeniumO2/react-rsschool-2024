import { CardList } from '../../../../../components/CardList/CardList';
import { Pagination } from '../../../../../components/Pagination/Pagination';
import { narutoAPI } from '../../../../../services/narutoApi';
import styles from '../page.module.css';
import { DetailedCard } from '../../../../../components/CardList/DetailedCard/DetailedCard';
import { NextRouter } from 'next/router';

export default async function SearchDetailsPage({
  params,
}: {
  params: NextRouter['query'];
}) {
  const { name, page, details } = params;

  let charName = '';

  if (name && typeof name === 'string') {
    const decodedName = decodeURIComponent(name);
    charName = decodedName.split('=')[1].replace(/"/g, '');
  }

  const charactersData = await narutoAPI.getCharacters({
    name: charName,
    page: Number(page),
  });

  const characterDetails =
    details && typeof details === 'string'
      ? await narutoAPI.getCharacterById(details.split('3D')[1])
      : null;

  return (
    <div>
      <div className={styles.cardListSection}>
        <CardList cards={charactersData.characters} />

        <DetailedCard data={characterDetails} />
      </div>

      {charactersData && <Pagination charactersData={charactersData} />}
    </div>
  );
}
