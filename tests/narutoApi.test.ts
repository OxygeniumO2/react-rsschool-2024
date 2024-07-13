import { vi } from 'vitest';
import { narutoAPI } from '../src/services/narutoApi';
import baseUrl from '../src/services/baseUrl';
import { DEFAULT_NUMBER_OF_ITEMS } from '../src/constants/constants';

global.fetch = vi.fn();

describe('narutoAPI', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getCharacters', () => {
    it('should fetch characters with default parameters', async () => {
      const mockResponse = {
        characters: [
          {
            id: '1',
            name: 'Character 1',
            images: ['image1.jpg'],
            debut: { appearsIn: 'Movie 1' },
            personal: { sex: 'Male' },
          },
        ],
        total: 1,
        limit: 6,
        page: 1,
        currentPage: 1,
        pageSize: 6,
      };
      (fetch as jest.Mock).mockResolvedValue({
        json: () => Promise.resolve(mockResponse),
      });

      const response = await narutoAPI.getCharacters({});

      expect(fetch).toHaveBeenCalledWith(
        `${baseUrl}/characters?limit=${DEFAULT_NUMBER_OF_ITEMS}&name=&page=1`
      );
      expect(response).toEqual(mockResponse);
    });

    it('should fetch characters with provided parameters', async () => {
      const mockResponse = {
        characters: [
          {
            id: '1',
            name: 'Character 1',
            images: ['image1.jpg'],
            debut: { appearsIn: 'Movie 1' },
            personal: { sex: 'Male' },
          },
        ],
        total: 1,
        limit: 5,
        page: 2,
        currentPage: 2,
        pageSize: 5,
      };
      (fetch as jest.Mock).mockResolvedValue({
        json: () => Promise.resolve(mockResponse),
      });

      const response = await narutoAPI.getCharacters({
        name: 'Naruto',
        page: 2,
        limit: 5,
      });

      expect(fetch).toHaveBeenCalledWith(
        `${baseUrl}/characters?limit=5&name=Naruto&page=2`
      );
      expect(response).toEqual(mockResponse);
    });
  });

  describe('getCharacterById', () => {
    it('should fetch character by id', async () => {
      const mockResponse = {
        id: '1',
        name: 'Character 1',
        images: ['image1.jpg'],
        debut: { appearsIn: 'Movie 1' },
        personal: { sex: 'Male' },
      };
      (fetch as jest.Mock).mockResolvedValue({
        json: () => Promise.resolve(mockResponse),
      });

      const response = await narutoAPI.getCharacterById('1');

      expect(fetch).toHaveBeenCalledWith(`${baseUrl}/characters/1`);
      expect(response).toEqual(mockResponse);
    });
  });
});
