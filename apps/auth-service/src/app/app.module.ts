import { Module } from '@nestjs/common';
import { AuthController } from './app.controller';
import { AuthService } from './app.service';
import { STRTAGIES } from './strategies';
import { AUTH_GUARDS } from './guargs';
import { SHARED_GUARDS } from '@marketplacer/shared-backend';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@marketplacer/prisma-client';
import { options } from './config';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ClientsModule } from '@nestjs/microservices';
import { KAFKA_CONFIG } from '@marketplacer/configuration';
import { Transport } from '@nestjs/microservices';

@Module({
  imports: [PassportModule, ConfigModule.forRoot({ isGlobal: true }), JwtModule.registerAsync(options()), HttpModule, PrismaModule,
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
  controllers: [AuthController],
  providers: [AuthService, ...STRTAGIES, ...AUTH_GUARDS, ...SHARED_GUARDS],
})
export class AuthModule {}
