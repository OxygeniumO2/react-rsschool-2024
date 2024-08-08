import { CardList } from '../../../../../components/CardList/CardList';
import { DetailedCard } from '../../../../../components/CardList/DetailedCard/DetailedCard';
import Layout from '../../../../../components/Layout/Layout';
import { apiSlice } from '../../../../../services/narutoApi';
import { RootState, wrapper } from '../../../../../store/store';

const SearchDetailedPage = () => {
  return (
    <Layout>
      <CardList>
        <DetailedCard />
      </CardList>
    </Layout>
  );
};

export default SearchDetailedPage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store: RootState) => async (context) => {
    const { details, name, page } = context.query;

    let charName = '';

    if (name && typeof name === 'string') {
      charName = name?.split('=')[1].replace(/"/g, '');
    }

    if (details && typeof details === 'string') {
      await store.dispatch(
        apiSlice.endpoints.getCharacterById.initiate(details.split('=')[1])
      );
    }

    await store.dispatch(
      apiSlice.endpoints.getCharacters.initiate({
        name: charName,
        page: Number(page),
      })
    );

    await Promise.all(store.dispatch(apiSlice.util.getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);
