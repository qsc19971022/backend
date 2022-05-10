
// mongoose中一切都是始于schema对象的
const mongoose = require('mongoose');
const conf = require('../config/config');
const logger = require('../utils/log');

// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  reconnectInterval: conf.mongodb.reconnectInterval,
  autoReconnect: conf.mongodb.autoReconnect,
  keepAlive: conf.mongodb.keepAlive,
  poolSize: conf.mongodb.poolSize
};
mongoose.connect(conf.mongodb.connectStr, options);
const db = mongoose.connection;

db.on('connected', () => {
  logger.info('mongodb connected ');
});
db.on('error', (error) => {
  logger.error('mongodb error ', String(error));
});
db.on('disconnected', () => {
  logger.error("disconnected....");
});
