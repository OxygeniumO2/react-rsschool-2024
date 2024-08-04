import App from '../../../../App';
import { Character, GetCharactersResp } from '../../../../services/narutoApi';
import { DEFAULT_NUMBER_OF_ITEMS } from '../../../../constants/constants';
import { GetServerSideProps } from 'next';

type SearchPageProps = {
  charactersResp: GetCharactersResp;
  detail: Character;
};

const SearchPage = ({ charactersResp, detail }: SearchPageProps) => {
  return <App charactersResp={charactersResp} detail={detail} />;
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name, page, details } = context.query;

  let charName = '';

  if (name && typeof name === 'string') {
    charName = name?.split('=')[1].replace(/"/g, '');
  }

  const res2 = await fetch(
    `https://dattebayo-api.onrender.com/characters?limit=${DEFAULT_NUMBER_OF_ITEMS}&name=${charName}&page=${page}`
  );
  const res = await res2.json();

  let detailData = null;
  if (details) {
    const detailsToNum = Number(details);
    const resDetail = await fetch(
      `https://dattebayo-api.onrender.com/characters/${res.characters[detailsToNum - 1].id}`
    );
    detailData = await resDetail.json();
  }

  return {
    props: {
      charactersResp: res,
      detail: detailData,
    },
  };
};
