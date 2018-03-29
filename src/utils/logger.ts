import * as bunyan from 'bunyan';
import * as config from 'config';

const pkgInfo = require('../../package.json');
const loggerLevel = config.get<bunyan.LogLevel>('debug.logLevel') || 'info';

export const logger = bunyan.createLogger({
  name: pkgInfo.name,
  level: loggerLevel
});
