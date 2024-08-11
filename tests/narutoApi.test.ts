import { narutoAPI } from '../src/services/narutoApi';

describe('narutoAPI', () => {
  it('should get characters successfully', async () => {
    const response = await narutoAPI.getCharacters({ name: 'test', page: 1 });

    expect(response.characters[0].name).toEqual('test1');
  });

  it('should get character by ID successfully', async () => {
    const response = await narutoAPI.getCharacterById('1');

    expect(response.name).toEqual('test1');
  });
});
