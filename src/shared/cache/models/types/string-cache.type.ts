import { RedisCommandArgument } from '@redis/client/dist/lib/commands';
import { SetOptions } from '@redis/client/dist/lib/commands/SET';
import { MSetArguments } from '@redis/client/dist/lib/commands/MSET';

export type CacheArgument = RedisCommandArgument;

export type StringCacheValue = RedisCommandArgument | number;
export type StringCacheSetOptions = SetOptions;

export type StringCacheMSetArguments = MSetArguments;
//export type StringCacheM
