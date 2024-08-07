import { ReactNode } from 'react';
import { CardList } from '../../../../components/CardList/CardList';
import { Pagination } from '../../../../components/Pagination/Pagination';
import { narutoAPI } from '../../../../services/narutoApi';
import styles from './page.module.css';
import { NextRouter } from 'next/router';

type SearchLayoutProps = {
  children: ReactNode;
  params: NextRouter['query'];
};

export default async function SearchLayout({
  children,
  params,
}: SearchLayoutProps) {
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
        {children}
      </div>
      {charactersData && <Pagination charactersData={charactersData} />}
    </>
  );
}
