import { GetCharacters } from '../src/services/narutoApi';

export const narutoAPI = {
  getCharacters: async ({ name, page }: GetCharacters) => {
    return {
      characters: [
        {
          id: '1',
          name: name || 'test1',
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
      currentPage: page || 1,
      pageSize: 6,
      total: 6,
    };
  },
};
