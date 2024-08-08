import { http, HttpResponse } from 'msw';
import { render, screen, waitFor } from '../src/utils/test-utilts';
import { server } from './server';
import { CardList } from '../src/components/CardList/CardList';
import SearchPage, {
  getServerSideProps,
} from '../src/pages/search/[name]/[page]';

describe('CardList', () => {
  it('should render correctly', async () => {
    render(<CardList> {null}</CardList>);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    server.use(
      http.get('https://dattebayo-api.onrender.com/characters', () => {
        return HttpResponse.json({
          characters: [
            {
              id: '1',
              name: 'test1',
              images: ['test1', 'test2'],
              debut: {
                appearsIn: 'test',
              },
              personal: {
                sex: 'test',
                clan: 'test',
                classification: 'test',
              },
            },
          ],
          currentPage: 1,
          pageSize: 6,
          total: 6,
        });
      })
    );

    await waitFor(() => {
      expect(screen.getByText('test1')).toBeInTheDocument();
    });
  });

  it('should render correctly', async () => {
    render(<SearchPage></SearchPage>);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    server.use(
      http.get('https://dattebayo-api.onrender.com/characters', () => {
        return HttpResponse.json({
          characters: [
            {
              id: '1',
              name: 'test1',
              images: ['test1', 'test2'],
              debut: {
                appearsIn: 'test',
              },
              personal: {
                sex: 'test',
                clan: 'test',
                classification: 'test',
              },
            },
          ],
          currentPage: 1,
          pageSize: 6,
          total: 6,
        });
      })
    );

    await waitFor(() => {
      expect(screen.getByText('test1')).toBeInTheDocument();
    });
  });

  it('should render correctly', async () => {
    render(<CardList> {null}</CardList>);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    server.use(
      http.get('https://dattebayo-api.onrender.com/characters', () => {
        return HttpResponse.json({
          characters: [],
        });
      })
    );

    await waitFor(() => {
      expect(screen.getByText('No characters found')).toBeInTheDocument();
    });
  });

  it('check on good case', async () => {
    const context = {
      query: { name: 'name="test', page: '1' },
    };
    const { props } = await getServerSideProps(context);
    const { test } = props;
    expect(test).toEqual('test');
  });
});
