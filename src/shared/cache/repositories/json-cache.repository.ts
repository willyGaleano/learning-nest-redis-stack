import { Injectable } from '@nestjs/common';
import { RedisCache } from '../clients/redis-cache';
import { RedisJSON } from '@redis/json/dist/commands';
import { RedisCommandArgument } from '@redis/client/dist/lib/commands';
//import { JsonMSetItem } from '@redis/json/dist/commands/MSET';

export interface JsonMSetItem {
  key: RedisCommandArgument;
  path: RedisCommandArgument;
  value: RedisJSON;
}

export interface JsonCacheGetOptions {
  path?: string | Array<string>;
  INDENT?: string;
  NEWLINE?: string;
  SPACE?: string;
  NOESCAPE?: true;
}

export interface NX {
  NX: true;
}

export interface XX {
  XX: true;
}

@Injectable()
export class JsonCacheRepository {
  constructor(private readonly cache: RedisCache) {}

  async get(
    key: string,
    options?: JsonCacheGetOptions,
  ): Promise<RedisJSON | null> {
    return await this.cache.client.json.get(key, options);
  }

  async set(
    key: string,
    path: string,
    json: RedisJSON,
    options?: NX | XX,
  ): Promise<'OK' | null> {
    return await this.cache.client.json.set(key, path, json, options);
  }

  async mset(keyValuePairs: Array<JsonMSetItem>): Promise<'OK'> {
    return await this.cache.client.json.mSet(keyValuePairs);
  }

  async mget(
    keys: Array<string>,
    path: string,
  ): Promise<Array<RedisJSON | null>> {
    return await this.cache.client.json.mGet(keys, path);
  }

  async del(key: string, path: string): Promise<number> {
    return await this.cache.client.json.del(key, path);
  }

  async numincrby(
    key: string,
    path: string,
    increment: number,
  ): Promise<number | Array<number>> {
    return await this.cache.client.json.numIncrBy(key, path, increment);
  }
}
