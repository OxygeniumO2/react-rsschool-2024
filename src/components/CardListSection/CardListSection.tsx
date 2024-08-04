import { CardList } from '../CardList/CardList';
import { Pagination } from '../Pagination/Pagination';
import { useRouter } from 'next/router';
import { apiSlice } from '../../services/narutoApi';
import { Loader } from '../Loader/Loader';

export const CardListSection = () => {
  const router = useRouter();
  const { name, page } = router.query;

  let charName = '';

  if (name && typeof name === 'string') {
    charName = name?.split('=')[1].replace(/"/g, '');
  }

  const handlePage = ({ page }: { page: number }) => {
    router.push(`/search/${router.query.name}/${page}`);
  };

  const result = apiSlice.useGetCharactersQuery(
    { name: charName, page: Number(page) },
    {
      skip: router.isFallback,
    }
  );

  const { isLoading, isFetching, data } = result;

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <>
      <CardList cards={data!.characters} />
      {data && <Pagination charactersData={data} onPageChange={handlePage} />}
    </>
  );
};
