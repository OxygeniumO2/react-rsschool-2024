import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://dattebayo-api.onrender.com/characters/1', () => {
    return HttpResponse.json({
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
    });
  }),
];
