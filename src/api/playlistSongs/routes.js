function routes(handler) {
    return [
      {
        method: 'POST',
        path: '/playlists/{playlistId}/songs',
        handler: handler.postPlaylistSongsHandler,
        options: {
          auth: 'openmusic_jwt'
        },
      },
      {
        method: 'GET',
        path: '/playlists/{playlistId}/songs',
        handler: handler.getPlaylistSongsHandler,
        options: {
          auth: 'openmusic_jwt'
        },
      },
      {
        method: 'DELETE',
        path: '/playlists/{playlistId}/songs',
        handler: handler.deletePlaylistSongsHandler,
        options: {
          auth: 'openmusic_jwt'
        },
      },
    ];
  }
  
  module.exports = routes;
  