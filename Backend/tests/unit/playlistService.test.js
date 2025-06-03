const playlistService = require('../../services/playlistService');

describe('playlistService', () => {
  it('should return cached playlists', () => {
    const playlists = [{ name: 'My Playlist' }];
    valkey.get.mockReturnValue(playlists);
    const result = playlistService.getUserPlaylists('user123', 1, 10);
    expect(result).toEqual(playlists);
  });
});