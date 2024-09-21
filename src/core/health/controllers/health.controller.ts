import { Controller, Get } from '@nestjs/common';
import { Public } from '@/shared/config/constants';

@Controller('health')
export class HealthCheckController {
  @Public()
  @Get()
  healthCheck(): string {
    return 'OK';
  }
}
