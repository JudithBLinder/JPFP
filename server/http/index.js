const chalk = require('chalk');
const app = require('./server');
const applyMiddleware = require('./middleware');
const apiRoter = require('./api/apiRouter');

// Middleware
applyMiddleware(app);

// API Router
app.use('/api', apiRoter);

const startServer = (port) =>
  new Promise((res) => {
    app.listen(port, () => {
      console.log(chalk.yellow(`Server is now listening on PORT:${port}`));
      res();
    });
  });

module.exports = startServer;
