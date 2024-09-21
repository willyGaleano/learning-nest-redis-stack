import { Environment, LogLevel, NodeEnv } from './config.enum';

export type GlobalConfig = {
  appName: string;
  logLevel: LogLevel;
  environment: Environment;
  nodeEnv: NodeEnv;
  loggerMessageKey: string;
};
