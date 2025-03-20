import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_CONFIG } from '@marketplacer/configuration';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: KAFKA_CONFIG.SERVICES.AUTH_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: KAFKA_CONFIG.CLIENT_IDS.AUTH_SERVICE,
            brokers: KAFKA_CONFIG.BROKERS,
          },
          consumer: {
            groupId: KAFKA_CONFIG.CONSUMER_GROUPS.AUTH_SERVICE,
            ...KAFKA_CONFIG.OPTIONS.CONSUMER
          },
          producer: KAFKA_CONFIG.OPTIONS.PRODUCER
        }
      }
    ])
  ],
  controllers: [AuthController],
})
export class AuthModule {} 