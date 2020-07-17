const { syncAndSeed } = require('./db/seedDB/index');
const startServer = require('./http/index');

const PORT = process.env.PORT || 3000;

syncAndSeed({ force: false })
  .then(startServer(PORT))
  .catch((e) => console.log(e));
