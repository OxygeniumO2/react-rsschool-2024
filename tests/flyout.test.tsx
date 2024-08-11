import { convertToCSV } from '../src/components/flyout/Flyout';

global.URL.createObjectURL = vi.fn(() => 'blob');

describe('convertToCSV', () => {
  it('should generate a valid CSV URL from an array of characters', () => {
    const characters = [
      {
        id: '1',
        images: ['test1', 'test2'],
        name: 'Naruto',
        personal: {
          sex: 'Male',
          clan: 'Uzumaki',
          classification: 'Ninja',
        },
        debut: {
          appearsIn: 'Naruto',
        },
      },
      {
        id: '2',
        images: ['test1', 'test2'],
        name: 'Sakura',
        personal: {
          sex: 'Female',
          clan: 'Haruno',
          classification: 'Ninja',
        },
        debut: {
          appearsIn: 'Naruto',
        },
      },
    ];

    const url = convertToCSV(characters);

    expect(url).toMatch('blob');
  });
});
