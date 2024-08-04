import { CardList } from '../CardList/CardList';
import { Pagination } from '../Pagination/Pagination';
import { useRouter } from 'next/router';
import { Character, GetCharactersResp } from '../../services/narutoApi';

type CardListSectionProps = {
  charactersResp: GetCharactersResp;
  detail: Character;
};

export const CardListSection = ({
  charactersResp,
  detail,
}: CardListSectionProps) => {
  const router = useRouter();

  const handlePage = ({ page }: { page: number }) => {
    router.push(`/search/${router.query.name}/${page}`);
  };

  return (
    <>
      <CardList cards={charactersResp.characters} detail={detail} />
      {charactersResp && (
        <Pagination charactersData={charactersResp} onPageChange={handlePage} />
      )}
    </>
  );
};
