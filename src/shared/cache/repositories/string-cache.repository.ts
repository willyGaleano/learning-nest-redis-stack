import { Injectable } from '@nestjs/common';
import { RedisCache } from '../clients/redis-cache';
import {
  CacheArgument,
  StringCacheMSetArguments,
  StringCacheSetOptions,
  StringCacheValue,
} from '../models/types/string-cache.type';

@Injectable()
export class StringCacheRepository {
  constructor(private readonly cache: RedisCache) {}

  async get(key: CacheArgument): Promise<CacheArgument | null> {
    return await this.cache.client.get(key);
  }

  async set(
    key: CacheArgument,
    value: StringCacheValue,
    options?: StringCacheSetOptions,
  ): Promise<CacheArgument | null> {
    return await this.cache.client.set(key, value, options);
  }

  async mset(keyValuePairs: StringCacheMSetArguments): Promise<CacheArgument> {
    return await this.cache.client.mSet(keyValuePairs);
  }

  async mget(keys: Array<CacheArgument>): Promise<Array<CacheArgument | null>> {
    return await this.cache.client.mGet(keys);
  }

  async incr(key: CacheArgument): Promise<number> {
    return await this.cache.client.incr(key);
  }

  async incrby(key: CacheArgument, increment: number): Promise<number> {
    return await this.cache.client.incrBy(key, increment);
  }

  async decr(key: CacheArgument): Promise<number> {
    return await this.cache.client.decr(key);
  }

  async decrby(key: CacheArgument, decrement: number): Promise<number> {
    return await this.cache.client.decrBy(key, decrement);
  }

  async expire(
    key: CacheArgument,
    seconds: number,
    mode?: 'NX' | 'XX' | 'GT' | 'LT',
  ): Promise<boolean> {
    return await this.cache.client.expire(key, seconds, mode);
  }
}
