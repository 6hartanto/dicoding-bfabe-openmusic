const autoBind = require('auto-bind')
class PlaylistsHandler {
  constructor(playlistsService, validator, songsService, playlistSongsService) {
    this._playlistsService = playlistsService;
    this._validator = validator;
    this._songsService = songsService;
    this._playlistSongsService = playlistSongsService;
    autoBind(this);
  }

  async postPlaylistHandler(request, h) {
    this._validator.validatePlaylistPayload(request.payload);
    const { name = 'untitled' } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    const playlistId = await this._playlistsService.addPlaylist({
      name, owner: credentialId,
    });

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan',
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  }

  async getPlaylistsHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const playlists = await this._playlistsService.getPlaylists(credentialId);
    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  async deletePlaylistHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.deletePlaylist(id, credentialId);

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus',
    };
  }

  async postSongToPlaylistHandler(request, h) {
    this._validator.validateSongToPlaylistPayload(request.payload);

    const { id: userId } = request.auth.credentials;
    const { playlistId } = request.params;
    const { songId } = request.payload;

    // await this._songsService.verifySongIsExist(songId);
    // await this._playlistsService.verifyPlaylistIsExist(playlistId);
    await this._playlistsService.verifyPlaylistAccess(playlistId, userId);
    await this._playlistSongsService.addSongToPlaylist(playlistId, songId);

    return h.response({
      status: 'success',
      message: ' Lagu berhasil ditambahkan ke playlist',
    }).code(201);
  }

  async getSongsFromPlaylistHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    const { playlistId } = request.params;

    await this._playlistsService.verifyPlaylistAccess(playlistId, userId);

    const songsFromPlaylist = await this._playlistSongsService.getSongsFromPlaylist(playlistId);

    return {
      status: 'success',
      data: {
        songs: songsFromPlaylist,
      },
    };
  }

  async deleteSongFromPlaylistHandler(request, h) {
    this._validator.validateSongToPlaylistPayload(request.payload);

    const { id: userId } = request.auth.credentials;
    const { playlistId } = request.params;
    const { songId } = request.payload;

    // await this._playlistsService.verifyPlaylistIsExist(playlistId);
    await this._playlistsService.verifyPlaylistAccess(playlistId, userId);
    await this._playlistSongsService.deleteSongFromPlaylist(playlistId, songId);

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus dari playlist',
    };
  }
}

module.exports = PlaylistsHandler;
