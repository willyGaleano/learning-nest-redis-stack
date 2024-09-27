import { Injectable } from '@nestjs/common';
import { RedisCache } from '../clients/redis-cache';
import { RedisCommandArgument } from '@redis/client/dist/lib/commands';

@Injectable()
export class ListCacheRepository {
  constructor(private readonly cache: RedisCache) {}

  async lpush(
    key: RedisCommandArgument,
    elements: RedisCommandArgument | Array<RedisCommandArgument>,
  ): Promise<number> {
    return await this.cache.client.lPush(key, elements);
  }

  async rpush(
    key: RedisCommandArgument,
    elements: RedisCommandArgument | Array<RedisCommandArgument>,
  ): Promise<number> {
    return await this.cache.client.rPush(key, elements);
  }

  async lpop(key: RedisCommandArgument): Promise<RedisCommandArgument | null> {
    return await this.cache.client.lPop(key);
  }

  async rpop(key: RedisCommandArgument): Promise<RedisCommandArgument | null> {
    return await this.cache.client.rPop(key);
  }

  async llen(key: RedisCommandArgument): Promise<number> {
    return await this.cache.client.lLen(key);
  }

  async lmove(
    source: RedisCommandArgument,
    destination: RedisCommandArgument,
    sourceDirection: 'LEFT' | 'RIGHT',
    destinationDirection: 'LEFT' | 'RIGHT',
  ): Promise<RedisCommandArgument | null> {
    return await this.cache.client.lMove(
      source,
      destination,
      sourceDirection,
      destinationDirection,
    );
  }

  async lrange(
    key: RedisCommandArgument,
    start: number,
    stop: number,
  ): Promise<Array<RedisCommandArgument>> {
    return await this.cache.client.lRange(key, start, stop);
  }

  async ltrim(
    key: RedisCommandArgument,
    start: number,
    stop: number,
  ): Promise<RedisCommandArgument> {
    return await this.cache.client.lTrim(key, start, stop);
  }

  async lindex(
    key: RedisCommandArgument,
    index: number,
  ): Promise<RedisCommandArgument | null> {
    return await this.cache.client.lIndex(key, index);
  }
}
