import { http, HttpResponse } from 'msw';
import { render, screen, waitFor } from '../src/utils/test-utilts';
import { server } from './server';
import { CardList } from '../src/components/CardList/CardList';

describe('CardListSection', () => {
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
});
