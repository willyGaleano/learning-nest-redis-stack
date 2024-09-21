import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import globalConfig from './utils/global-config.util';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [globalConfig],
    }),
  ],
})
export class ConfigAppModule {}
