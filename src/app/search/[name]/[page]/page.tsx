import { NextRouter } from 'next/router';
import { CardList } from '../../../../components/CardList/CardList';
import { Pagination } from '../../../../components/Pagination/Pagination';
import { narutoAPI } from '../../../../services/narutoApi';
import styles from './page.module.css';

export default async function SearchPage({
  params,
}: {
  params: NextRouter['query'];
}) {
  const { name, page } = params;

  let charName = '';

  if (name && typeof name === 'string') {
    const decodedName = decodeURIComponent(name);
    charName = decodedName.split('=')[1].replace(/"/g, '');
  }

  const charactersData = await narutoAPI.getCharacters({
    name: charName,
    page: Number(page),
  });

  return (
    <>
      <div className={styles.cardListSection}>
        <CardList cards={charactersData.characters} />
      </div>
      {charactersData && <Pagination charactersData={charactersData} />}
    </>
  );
}
