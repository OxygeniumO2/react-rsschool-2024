import { narutoAPI } from '../../../../../services/narutoApi';
import { DetailedCard } from '../../../../../components/CardList/DetailedCard/DetailedCard';
import { NextRouter } from 'next/router';

export default async function SearchDetailsPage({
  params,
}: {
  params: NextRouter['query'];
}) {
  const { details } = params;

  const characterDetails =
    details && typeof details === 'string'
      ? await narutoAPI.getCharacterById(details.split('3D')[1])
      : null;

  return <DetailedCard data={characterDetails} />;
}
