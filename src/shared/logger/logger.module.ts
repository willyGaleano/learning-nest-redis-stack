import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { getPinoLoggerConfig } from './utils/pino-config.util';
import { GlobalConfig } from '../config/models/types';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<GlobalConfig>) => {
        return getPinoLoggerConfig(configService);
      },
      inject: [ConfigService],
    }),
  ],
})
export class LoggerAppModule {}
