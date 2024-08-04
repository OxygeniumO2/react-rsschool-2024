import App from '../../../../App';
import { apiSlice } from '../../../../services/narutoApi';
import { RootState, wrapper } from '../../../../store/store';

const SearchPage = () => {
  return <App />;
};

export default SearchPage;

export const getServerSideProps = wrapper.getServerSideProps(
  (store: RootState) => async (context) => {
    const { name, page, details } = context.query;

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

    if (details) {
      await store.dispatch(
        apiSlice.endpoints.getCharacterById.initiate(details.toString())
      );
    }

    await Promise.all(store.dispatch(apiSlice.util.getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);
