import { CardList } from '../CardList/CardList';
import { Pagination } from '../Pagination/Pagination';
import { useRouter } from 'next/router';
import { Character, GetCharactersResp } from '../../services/narutoApi';

type CardListSectionProps = {
  characters: GetCharactersResp;
  detail: Character;
};

export const CardListSection = ({
  characters,
  detail,
}: CardListSectionProps) => {
  const router = useRouter();

  // useEffect(() => {
  //   if (characters) {
  //     dispatch(setCharacters(characters.characters));
  //   }
  // }, [characters]);

  const handlePage = ({ page }: { page: number }) => {
    router.push(`/search/${router.query.name}/${page}`);
  };

  return (
    <>
      <CardList cards={characters.characters} detail={detail} />
      {characters && (
        <Pagination charactersData={characters} onPageChange={handlePage} />
      )}
    </>
  );
};
