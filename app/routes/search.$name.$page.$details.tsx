import {
  useLoaderData,
  useNavigate,
  useNavigation,
  useParams,
} from '@remix-run/react';
import { DetailedCard } from '../../src/components/CardList/DetailedCard/DetailedCard';
import { Character, narutoAPI } from '../../src/services/narutoApi';
import { LoaderFunctionArgs } from '@remix-run/node';
import { Loader } from '../../src/components/Loader/Loader';
export const loader = async ({
  params,
}: LoaderFunctionArgs): Promise<Character> => {
  const { details } = params;

  let detailsId = '';

  if (details && typeof details === 'string') {
    detailsId = details.split('=')[1].replace(/"/g, '');
  }

  const data = await narutoAPI.getCharacterById(detailsId);
  return data;
};

export default function DetailsPage() {
  const data = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const { name, page } = useParams();
  const navigate = useNavigate();

  const handleCloseDetailedCard = () => {
    navigate(`/search/${name}/${page}`, { preventScrollReset: true });
  };

  if (navigation.state === 'loading') {
    return <Loader />;
  }

  return (
    <DetailedCard
      character={data}
      handleCloseDetailedCard={handleCloseDetailedCard}
    />
  );
}
