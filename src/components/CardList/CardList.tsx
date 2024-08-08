import styles from './cardList.module.css';
import { apiSlice, GetCharactersResp } from '../../services/narutoApi';
import { Card } from './Card/Card';
import { useContext, useEffect, useState } from 'react';
import { themeContext } from '../../App';
import { getThemeClass } from '../../utils/getThemeClass';
import { useRouter } from 'next/router';
import { Loader } from '../Loader/Loader';
import { Pagination } from '../Pagination/Pagination';

export const CardList = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { theme } = useContext(themeContext);
  const [loading, setLoading] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const { name, page, details } = router.query;
  const [currPage, setCurrPage] = useState(page);

  let charName = '';

  if (name && typeof name === 'string') {
    charName = name?.split('=')[1].replace(/"/g, '');
  }

  const result = apiSlice.useGetCharactersQuery(
    { name: charName, page: Number(page) },
    {
      skip: router.isFallback,
    }
  );

  useEffect(() => {
    const handleStart = (url: string) => {
      const currPageUrl = url.split('/')[3];
      if (!url.includes(`/${currPage}`)) {
        setLoading(() => true);
        setCurrPage(() => currPageUrl);
      } else if (url.includes(`details`)) {
        setLoadingDetails(() => true);
      }
    };
    const handleComplete = (url: string) => {
      url === router.asPath && setLoading(() => false);
      url === router.asPath && setLoadingDetails(() => false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }),
    [router];

  const { data, isLoading, isFetching } = result;

  const handleCloseDetailedCard = () => {
    router.push(`/search/${name}/${page}`, undefined, { scroll: false });
  };

  const handleNewDetailedCard = (index: string) => {
    if (details?.toString().split('=')[1] === index.toString()) {
      router.push(`/search/${name}/${page}`);
      return;
    }
    router.push(`/search/${name}/${page}/details=${index}`, undefined, {
      scroll: false,
    });
  };

  if (data?.characters.length === 0) {
    return <h2 className={styles.empty}>No characters found</h2>;
  }

  const handlePage = ({ page }: { page: number }) => {
    router.push(`/search/${name}/${page}`);
  };

  if (loading || isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <>
      <div className={styles.cardListSection}>
        <div
          className={`${styles.cardList} ${getThemeClass(theme, styles)}`}
          onClick={handleCloseDetailedCard}
        >
          {data?.characters.map((card) => (
            <Card
              key={card.id}
              card={card}
              handleDetailedCard={handleNewDetailedCard}
            />
          ))}
        </div>

        {loadingDetails ? <Loader /> : children}
      </div>
      <Pagination
        charactersData={data as GetCharactersResp}
        onPageChange={handlePage}
      />
    </>
  );
};
