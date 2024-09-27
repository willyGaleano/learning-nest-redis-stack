import { APP_NAME_DEFAULT, LOGGER_MESSAGE_KEY_DEFAULT } from '../constants';
import { Environment, LogLevel, NodeEnv } from '../models/enums';
import { GlobalConfig } from '../models/types';

export default (): GlobalConfig => ({
  appName: process.env.APP_NAME ?? APP_NAME_DEFAULT,
  logLevel: (process.env.LOG_LEVEL as LogLevel) ?? LogLevel.DEBUG,
  environment: (process.env.ENVIRONMENT as Environment) ?? Environment.LOCAL,
  nodeEnv: (process.env.NODE_ENV as NodeEnv) ?? NodeEnv.DEVELOPMENT,
  loggerMessageKey:
    process.env.LOGGER_MESSAGE_KEY ?? LOGGER_MESSAGE_KEY_DEFAULT,
});
