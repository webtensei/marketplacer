import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_CONFIG } from '@marketplacer/configuration';
import { UserController } from './user.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: KAFKA_CONFIG.SERVICES.USER_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: KAFKA_CONFIG.CLIENT_IDS.USER_SERVICE,
            brokers: KAFKA_CONFIG.BROKERS,
          },
          consumer: {
            groupId: KAFKA_CONFIG.CONSUMER_GROUPS.USER_SERVICE,
            ...KAFKA_CONFIG.OPTIONS.CONSUMER
          },
          producer: KAFKA_CONFIG.OPTIONS.PRODUCER
        }
      }
    ])
  ],
  controllers: [UserController],
})
export class UserModule {} 