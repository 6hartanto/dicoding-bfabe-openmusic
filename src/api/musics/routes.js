const routes = (handler) => [
  {
    method: 'POST',
    path: '/musics',
    handler: handler.postMusicHandler,
  },
  {
    method: 'GET',
    path: '/musics',
    handler: handler.getMusicsHandler,
  },
  {
    method: 'GET',
    path: '/musics/{id}',
    handler: handler.getMusicByIdHandler,
  },
  {
    method: 'PUT',
    path: '/musics/{id}',
    handler: handler.putMusicByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/musics/{id}',
    handler: handler.deleteMusicByIdHandler,
  },
];

module.exports = routes;
