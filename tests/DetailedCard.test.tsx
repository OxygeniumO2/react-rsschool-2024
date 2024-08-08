import { http, HttpResponse } from 'msw';
import { DetailedCard } from '../src/components/CardList/DetailedCard/DetailedCard';
import SearchDetailedPage from '../src/pages/search/[name]/[page]/[details]';
import { render, screen, waitFor } from '../src/utils/test-utilts';
import { server } from './server';

describe('DetailedCard', () => {
  it('should render correctly', async () => {
    render(<DetailedCard />);
    await waitFor(() => {
      expect(screen.getByTestId('detailed-card')).toBeInTheDocument();
    });
  });

  it('should render correctly', async () => {
    render(<SearchDetailedPage />);

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
      expect(screen.getByTestId('detailed-card')).toBeInTheDocument();
    });
  });
});
