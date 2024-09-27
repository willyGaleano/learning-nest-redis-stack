import { z } from 'zod';
import {
  environmentValues,
  logLevelValues,
  nodeEnvValues,
} from '../../constants';

export const CommonVariablesSchema = z
  .object({
    APP_NAME: z.string(),
    HTTP_PORT: z.coerce.number(),
    NODE_ENV: z.enum(nodeEnvValues),
    LOG_LEVEL: z.enum(logLevelValues),
    ENVIRONMENT: z.enum(environmentValues),
    LOGGER_MESSAGE_KEY: z.string().optional(),
  })
  .describe('CommonVariablesSchema');

export const RedisVariablesSchema = z
  .object({
    REDIS_PORT: z.coerce.number(),
    REDIS_HOST: z.string(),
    REDIS_USER: z.string(),
    REDIS_PASSWORD: z.string(),
  })
  .describe('RedisVariablesSchema');

export const EnvVariablesSchema = CommonVariablesSchema.merge(
  RedisVariablesSchema,
).describe('EnvironmentVariablesSchema');

export type EnvironmentVariables = z.infer<typeof EnvVariablesSchema>;
