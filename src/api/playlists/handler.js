const ClientError = require('../../exceptions/ClientError');
class PlaylistsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
    this.getPlaylistsHandler = this.getPlaylistsHandler.bind(this);
    this.getPlaylistByIdHandler = this.getPlaylistByIdHandler.bind(this);
    this.putPlaylistByIdHandler = this.putPlaylistByIdHandler.bind(this);
    this.deletePlaylistByIdHandler = this.deletePlaylistByIdHandler.bind(this);
  }

  async postPlaylistHandler(request, h) {
    this._validator.validatePlaylistPayload(request.payload);
    const { name = 'untitled', owner } = request.payload;

    const playlistId = await this._service.addPlaylist({ name, owner });

    const response = h.response({
      status: 'success',
      message: 'Playlist berhasil ditambahkan',
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  }

  async getPlaylistsHandler() {
    const playlists = await this._service.getPlaylists();
    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  async getPlaylistByIdHandler(request, h) {
    const { id } = request.params;
    const playlist = await this._service.getPlaylistById(id);
    return {
      status: 'success',
      data: {
        playlist,
      },
    };
  }

  async putPlaylistByIdHandler(request, h) {
    this._validator.validatePlaylistPayload(request.payload);
    const { id } = request.params;

    await this._service.editPlaylistById(id, request.payload);

    return {
      status: 'success',
      message: 'Playlist berhasil diperbarui',
    };
  }

  async deletePlaylistByIdHandler(request, h) {
    const { id } = request.params;
    await this._service.deletePlaylistById(id);

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus',
    };
  }
}

module.exports = PlaylistsHandler;
