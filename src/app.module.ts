import { Module } from '@nestjs/common';
import { ConfigAppModule } from '@/shared/config/config.module';
import { LoggerAppModule } from '@/shared/logger/logger.module';
import { HealthCheckModule } from '@/core/health/health.module';

@Module({
  imports: [ConfigAppModule, LoggerAppModule, HealthCheckModule],
})
export class AppModule {}
