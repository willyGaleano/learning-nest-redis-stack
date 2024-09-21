import { Module } from '@nestjs/common';
import { HealthCheckController } from './controllers/health.controller';

@Module({
  controllers: [HealthCheckController],
})
export class HealthCheckModule {}
