import { Controller, Get, Post, Param, Body, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_CONFIG } from '@marketplacer/configuration';
import { firstValueFrom } from 'rxjs';

@Controller('user')
export class UserController implements OnModuleInit {
  constructor(
    @Inject(KAFKA_CONFIG.SERVICES.USER_SERVICE) private readonly userClient: ClientKafka
  ) {}

  async onModuleInit() {
    Object.values(KAFKA_CONFIG.TOPICS.USER).forEach(topic => {
      this.userClient.subscribeToResponseOf(topic);
    });
    await this.userClient.connect();
  }

  @Post()
  async createUser(@Body() userData: any) {
    return firstValueFrom(
      this.userClient.send(KAFKA_CONFIG.TOPICS.USER.CREATE, userData)
    );
  }

  @Get()
  async getUsers() {
    console.log('getUsers');
    return firstValueFrom(
      this.userClient.send(KAFKA_CONFIG.TOPICS.USER.GET_ALL, {})
    );
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return firstValueFrom(
      this.userClient.send(KAFKA_CONFIG.TOPICS.USER.GET_ONE, {
        id
      })
    );
  }
} 