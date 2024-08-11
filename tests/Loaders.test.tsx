import { loader as loaderSearchPage } from '../app/routes/search.$name.$page';
import { loader as loaderSearchPageDetails } from '../app/routes/search.$name.$page.$details';

describe('loader', () => {
  it('should return correct data based on parameters', async () => {
    vi.fn().mockResolvedValue({
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

    const request = new Request('https://test.com');
    const params = { name: 'name=test1', page: '1' };
    const result = await loaderSearchPage({ request, params, context: {} });

    expect(result).toEqual({
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
  });

  it('should return correct data based on parameters', async () => {
    vi.fn().mockResolvedValue({
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

    const request = new Request('https://test.com');
    const params = { name: 'name=test1', page: '1' };
    const result = await loaderSearchPageDetails({
      request,
      params,
      context: {},
    });

    expect(result).toEqual({
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
  });
});
