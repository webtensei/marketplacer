/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';  
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KAFKA_CONFIG } from '@marketplacer/configuration';

async function bootstrap() {

  const logger = new Logger('user-service');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
          brokers: KAFKA_CONFIG.BROKERS,
      },
      consumer: {
        groupId: KAFKA_CONFIG.CONSUMER_GROUPS.USER_SERVICE,
      },
    },
  });

  app.listen();
  logger.log(`🚀 user-service is up and running ...`);
}

bootstrap();