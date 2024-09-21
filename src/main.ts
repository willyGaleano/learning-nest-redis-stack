import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { validateEnvVariables } from '@/shared/config/utils/validate-env-vars.util';
import {
  GLOBAL_API_VERSION,
  HTTP_PORT_DEFAULT,
} from '@/shared/config/constants';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  const configService = app.get<ConfigService>(ConfigService);
  const APP_NAME = configService.get<string>('APP_NAME');
  const GLOBAL_API_PREFIX = `${APP_NAME}/${GLOBAL_API_VERSION}`;

  app.setGlobalPrefix(GLOBAL_API_PREFIX);
  app.useLogger(app.get(Logger));

  validateEnvVariables(process.env, app.get(Logger));

  await app.listen(
    configService.get<number>('HTTP_PORT', HTTP_PORT_DEFAULT),
    '0.0.0.0',
    async () => {
      app
        .get(Logger)
        .log(`Server ${APP_NAME} is running on: ${await app.getUrl()}`);
    },
  );
}

bootstrap();
