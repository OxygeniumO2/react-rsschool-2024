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
  id: number;
  name: string;
}

export async function getCharacters({
  name = '',
  page = 1,
  limit = 10,
}: GetCharacters = {}): Promise<GetCharactersResp> {
  const data = await fetch(
    `${baseUrl}/characters?limit=${limit}&name=${name}&page=${page}`
  );

  return await data.json();
}
