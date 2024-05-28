const morgan = require('morgan');
const logger = require('simple-node-logger').createSimpleLogger();

const stream = {
  write: (message) => logger.info(message.trim()),
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

const morganMiddleware = morgan('combined', { stream, skip });

module.exports = morganMiddleware;
