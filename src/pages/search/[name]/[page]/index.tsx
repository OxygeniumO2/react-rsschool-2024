import { CardList } from '../../../../components/CardList/CardList';
import Layout from '../../../../components/Layout/Layout';
import { apiSlice } from '../../../../services/narutoApi';
import { RootState, wrapper } from '../../../../store/store';

const SearchPage = () => {
  return (
    <Layout>
      <CardList>{null}</CardList>
    </Layout>
  );
};

export default SearchPage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store: RootState) => async (context) => {
    const { name, page } = context.query;

    let charName = '';

    if (name && typeof name === 'string') {
      charName = name?.split('=')[1].replace(/"/g, '');
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
