import { Controller, Inject, Post, Body, Get } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { KAFKA_CONFIG } from '@marketplacer/configuration';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(KAFKA_CONFIG.SERVICES.AUTH_SERVICE) private readonly authClient: ClientKafka
  ) {}

  async onModuleInit() {
    // Subscribe to response topics
    Object.values(KAFKA_CONFIG.TOPICS.AUTH).forEach(pattern => {
      this.authClient.subscribeToResponseOf(pattern);
    });
    await this.authClient.connect();
  }

  @Post('login')
  async login(@Body() loginData: any) {
    return firstValueFrom(
      this.authClient.send(KAFKA_CONFIG.TOPICS.AUTH.LOGIN, loginData)
    );
  }

  @Post('register')
  async register(@Body() registerData: any) {
    return firstValueFrom(
      this.authClient.send(KAFKA_CONFIG.TOPICS.AUTH.REGISTER, registerData)
    );
  }

  @Post('logout')
  async logout(@Body() logoutData: any) {
    return firstValueFrom(
      this.authClient.send(KAFKA_CONFIG.TOPICS.AUTH.LOGOUT, logoutData)
    );
  }

  @Post('refresh-token')
  async refreshToken(@Body() refreshData: any) {
    return firstValueFrom(
      this.authClient.send(KAFKA_CONFIG.TOPICS.AUTH.REFRESH_TOKEN, refreshData)
    );
  }
} 