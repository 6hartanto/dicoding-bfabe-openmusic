class PlaylistsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
    this.getPlaylistsHandler = this.getPlaylistsHandler.bind(this);
    this.deletePlaylistHandler = this.deletePlaylistHandler.bind(this);
  }

  async postPlaylistHandler(request, h) {
    this._validator.validatePlaylistPayload(request.payload);
    const { name = 'untitled' } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    const playlistId = await this._service.addPlaylist({
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
    const playlists = await this._service.getPlaylists(credentialId);
    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }

  // async putPlaylistByIdHandler(request, h) {
  //   this._validator.validatePlaylistPayload(request.payload);
  //     const { id } = request.params;
  //     const { id: credentialId } = request.auth.credentials;
 
  //     await this._service.verifyPlaylistAccess(id, credentialId);
  //     await this._service.editPlaylistById(id, request.payload);
  //     return {
  //       status: 'success',
  //       message: 'Catatan berhasil diperbarui',
  //     };
  // }

  // async getPlaylistByIdHandler(request, h) {
  //   const { id } = request.params;
  //     const { id: credentialId } = request.auth.credentials;
 
  //     await this._service.verifyPlaylistAccess(id, credentialId);
  //     const playlist = await this._service.getPlaylistById(id);
  //     return {
  //       status: 'success',
  //       data: {
  //         playlist,
  //       },
  //     };
  // }

  async deletePlaylistHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.deletePlaylist(id, credentialId);

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus',
    };
  }
}

module.exports = PlaylistsHandler;
