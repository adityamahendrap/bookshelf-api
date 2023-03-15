const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const port = 9000;

const init = async () => {
  const server = Hapi.server({
    port,
    host: 'localhost',
  });

  server.route(routes);

  await server.start();
  /* eslint-disable no-console */
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
