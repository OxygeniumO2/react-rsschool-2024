import { GetCharactersResp } from '../../services/narutoApi';
import { CardList } from '../CardList/CardList';
import { Loader } from '../Loader/Loader';
import { Pagination } from '../Pagination/Pagination';

type CardListSectionProps = {
  charactersData: GetCharactersResp | null;
  isLoading: boolean;
  handleCharactersData: (page: number) => void;
};

export const CardListSection = ({
  charactersData,
  isLoading,
  handleCharactersData,
}: CardListSectionProps) => {
  const characters = charactersData ? charactersData.characters : [];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <CardList cards={characters} />
      {charactersData && (
        <Pagination
          charactersData={charactersData}
          onPageChange={handleCharactersData}
        />
      )}
    </>
  );
};
