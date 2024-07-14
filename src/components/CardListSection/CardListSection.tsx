import {
  Character,
  GetCharactersResp,
  HandleCharactersDataParams,
} from '../../services/narutoApi';
import { CardList } from '../CardList/CardList';
import { Loader } from '../Loader/Loader';
import { Pagination } from '../Pagination/Pagination';

type CardListSectionProps = {
  charactersData: GetCharactersResp | null;
  isLoading: boolean;
  handleCharactersData: (params: HandleCharactersDataParams) => void;
  detailedCard: Character | null;
  handleDetailedCard: (card: Character | null) => void;
};

export const CardListSection = ({
  charactersData,
  isLoading,
  handleCharactersData,
  detailedCard,
  handleDetailedCard,
}: CardListSectionProps) => {
  const characters = charactersData ? charactersData.characters : [];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <CardList
        cards={characters}
        detailedCard={detailedCard}
        handleDetailedCard={handleDetailedCard}
      />
      {charactersData && (
        <Pagination
          charactersData={charactersData}
          onPageChange={handleCharactersData}
        />
      )}
    </>
  );
};
