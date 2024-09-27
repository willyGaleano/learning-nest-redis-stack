import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisCache } from './clients/redis-cache';
import { EnvironmentVariables } from '../config/models/schemas';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: RedisCache,
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>,
      ) => {
        const client = new RedisCache(configService);
        await client.onModuleInit();
        return client;
      },
    },
  ],
  exports: [RedisCache],
})
export class CacheModule {}
