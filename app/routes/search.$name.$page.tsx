import {
  Outlet,
  useLoaderData,
  useNavigation,
  useParams,
} from '@remix-run/react';
import { CardList } from '../../src/components/CardList/CardList';
import { Pagination } from '../../src/components/Pagination/Pagination';
import { GetCharactersResp, narutoAPI } from '../../src/services/narutoApi';
import { LoaderFunctionArgs } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import { Loader } from '../../src/components/Loader/Loader';

export const loader = async ({
  params,
}: LoaderFunctionArgs): Promise<GetCharactersResp> => {
  const { name, page } = params;
  let charName = '';

  if (name && typeof name === 'string') {
    charName = name.split('=')[1].replace(/"/g, '');
  }

  const data = await narutoAPI.getCharacters({
    name: charName,
    page: Number(page),
  });
  return data;
};

export default function SearchPage() {
  const data = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const params = useParams();
  const { name, details } = params;
  const handlePageChange = ({ page }: { page: number }) => {
    navigate(`/search/${name}/${page}`);
  };

  return (
    <>
      <div className="cardListSection">
        <CardList cards={data.characters} />
        {!details && navigation.state === 'loading' ? <Loader /> : <Outlet />}
      </div>
      <Pagination charactersData={data} onPageChange={handlePageChange} />
    </>
  );
}
