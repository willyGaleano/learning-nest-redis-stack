import { Environment, LogLevel, NodeEnv } from '../enums';

export type GlobalConfig = {
  appName: string;
  logLevel: LogLevel;
  environment: Environment;
  nodeEnv: NodeEnv;
  loggerMessageKey: string;
};
