const log4js = require('log4js');

log4js.configure({
  appenders: {
    console: { type: 'console'}
    // file: { type: 'file', filename: 'logs/log4jsconnect.log' }
  },
  categories: {
    default: { appenders: ['console'], level: 'debug'}
    // log4jslog: { appenders: ['file'], level: 'debug' }
  }
});
const logger = log4js.getLogger('WoftSun');
module.exports = logger;
