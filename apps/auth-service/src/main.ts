import { Logger } from '@nestjs/common';  
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KAFKA_CONFIG } from '@marketplacer/configuration';
import { HttpToRpcExceptionFilter } from '@marketplacer/shared-backend';

async function bootstrap() {

  const logger = new Logger('auth-service');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
          brokers: KAFKA_CONFIG.BROKERS,
          clientId: KAFKA_CONFIG.CLIENT_IDS.AUTH_SERVICE,
      },
      consumer: {
        groupId: KAFKA_CONFIG.CONSUMER_GROUPS.AUTH_SERVICE,
      },
    },
  });

  app.useGlobalFilters(new HttpToRpcExceptionFilter());

  app.listen();
  logger.log(`🚀 auth-service is up and running ...`);
}

bootstrap();