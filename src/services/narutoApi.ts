import baseUrl from './baseUrl';

interface GetCharacters {
  name?: string;
  page?: number;
  limit?: number;
}
export interface GetCharactersResp {
  characters: Character[];
  currentPage: number;
  pageSize: number;
  total: number;
}

export interface Character {
  id: string;
  name: string;
  images: string[];
  debut: {
    appearsIn?: string;
  };
  personal: {
    sex?: string;
    clan?: string;
    classification?: string | string[];
  };
}

export const narutoAPI = {
  async getCharacters({
    name = '',
    page = 1,
    limit = 6,
  }: GetCharacters = {}): Promise<GetCharactersResp> {
    const data = await fetch(
      `${baseUrl}/characters?limit=${limit}&name=${name}&page=${page}`
    );

    return await data.json();
  },

  async getCharacterById(id: string): Promise<Character> {
    const data = await fetch(`${baseUrl}/characters/${id}`);

    return await data.json();
  },
};
