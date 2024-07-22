import { Character } from '../src/services/narutoApi';
import { convertToCSV } from '../src/components/flyout/Flyout';

describe('convertToCSV', () => {
  it('should generate CSV content for an array of characters with all fields filled', () => {
    const characters = [
      {
        id: '1',
        name: 'Naruto',
        images: [],
        personal: {
          sex: 'Male',
          clan: 'Uzumaki',
          classification: 'Jinchuriki',
        },
        debut: { appearsIn: 'Anime' },
      },
      {
        id: '2',
        name: 'Sakura',
        images: [],
        personal: {
          sex: 'Female',
          clan: 'Haruno',
          classification: 'Medical Ninja',
        },
        debut: { appearsIn: 'Anime' },
      },
    ];

    const expectedCSV =
      'Name: Naruto, Male, Uzumaki, Jinchuriki, Anime\nName: Sakura, Female, Haruno, Medical Ninja, Anime\n';
    const result = convertToCSV(characters);

    expect(result).toEqual(expectedCSV);
  });

  it('should handle cases where some fields are missing or null', () => {
    const characters = [
      {
        id: '1',
        images: [],
        name: 'Sasuke',
        personal: { sex: 'Male', classification: 'Rogue Ninja' },
        debut: { appearsIn: 'Anime' },
      },
      {
        id: '2',
        images: [],
        name: 'Kakashi',
        debut: { appearsIn: 'Anime' },
        personal: {
          sex: 'Male',
        },
      },
    ];

    const expectedCSV =
      'Name: Sasuke, Male, , Rogue Ninja, Anime\nName: Kakashi, Male, , , Anime\n';
    const result = convertToCSV(characters);

    expect(result).toEqual(expectedCSV);
  });

  it('should return an empty string for an empty input array', () => {
    const characters: Character[] = [];
    const result = convertToCSV(characters);

    expect(result).toEqual('');
  });
});
