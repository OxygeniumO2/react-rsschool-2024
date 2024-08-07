import { CardList } from '../../../../../components/CardList/CardList';
import { DetailedCard } from '../../../../../components/CardList/DetailedCard/DetailedCard';
import Layout from '../../../../../components/Layout/Layout';
import { apiSlice } from '../../../../../services/narutoApi';
import { RootState, wrapper } from '../../../../../store/store';

const SearchPage = () => {
  return (
    <Layout>
      <CardList>
        <DetailedCard />
      </CardList>
    </Layout>
  );
};

export default SearchPage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store: RootState) => async (context) => {
    const { details } = context.query;

    if (details && typeof details === 'string') {
      await store.dispatch(
        apiSlice.endpoints.getCharacterById.initiate(details.split('=')[1])
      );
    }

    await Promise.all(store.dispatch(apiSlice.util.getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);
