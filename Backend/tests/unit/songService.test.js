// src/tests/unit/songService.test.js
const songService = require('../../services/songService.js');
const valkey = require('../../config/valkey.js');
jest.mock('../../config/valkey.js');

describe('songService', () => {
  it('should return cached songs', () => {
    const songs = [{ title: 'Test' }];
    valkey.get.mockReturnValue(songs);
    const result = songService.getAllSongs(1, 10);
    expect(result).toEqual(songs);
  });
});