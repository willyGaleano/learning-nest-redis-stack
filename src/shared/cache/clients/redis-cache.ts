import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';
import { EnvironmentVariables } from '../../config/models/schemas';

@Injectable()
export class RedisCache implements OnModuleInit, OnModuleDestroy {
  private redisClient: RedisClientType;

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  async onModuleInit() {
    this.redisClient = createClient({
      socket: {
        port: this.configService.get('REDIS_PORT'),
        host: this.configService.get('REDIS_HOST'),
      },
      username: this.configService.get('REDIS_USER'),
      password: this.configService.get('REDIS_PASSWORD'),
    });

    await this.redisClient.connect();
  }

  async onModuleDestroy() {
    await this.redisClient.disconnect();
  }

  get client() {
    return this.redisClient;
  }
}
