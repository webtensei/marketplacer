import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { KAFKA_CONFIG } from '@marketplacer/configuration';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(KAFKA_CONFIG.TOPICS.USER.CREATE)
  createUser(user: any) {
    return this.appService.createUser(user);
  }

  @MessagePattern(KAFKA_CONFIG.TOPICS.USER.GET_ALL)
  getAllUsers() {
    return this.appService.getAllUsers();
  }
}
