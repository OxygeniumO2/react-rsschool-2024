import { useNavigate, useParams } from 'react-router-dom';
import { apiSlice } from '../../services/narutoApi';
import { CardList } from '../CardList/CardList';
import { Loader } from '../Loader/Loader';
import { Pagination } from '../Pagination/Pagination';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCharacters } from '../../store/charactersSlice';

export const CardListSection = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(params.page || 1);
  const {
    data: characters,
    isLoading,
    isFetching,
  } = apiSlice.useGetCharactersQuery({
    page: page as number,
    name: params?.name?.split('"')[1],
  });

  useEffect(() => {
    if (characters) {
      dispatch(setCharacters(characters.characters));
    }
  }, [characters]);

  useEffect(() => {
    setPage(params.page || 1);
  }, [params.page]);

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (!characters) {
    return <div>No characters found</div>;
  }

  const handlePage = ({ page }: { page: number }) => {
    setPage(page);
    navigate(`/search/name="${params?.name?.split('"')[1]}"/${page}`);
  };

  return (
    <>
      <CardList cards={characters.characters} />
      {characters && (
        <Pagination charactersData={characters} onPageChange={handlePage} />
      )}
    </>
  );
};
