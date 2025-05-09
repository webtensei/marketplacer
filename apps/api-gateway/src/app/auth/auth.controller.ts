import { Controller, Inject, Post, Body, Get, UsePipes, Query, HttpException, HttpStatus, HttpExceptionOptions } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { KAFKA_CONFIG } from '@marketplacer/configuration';
import { ZodValidationPipe } from 'nestjs-zod';
import { LoginDto, RegisterDto } from '@marketplacer/shared-models';
import { Logger } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    @Inject(KAFKA_CONFIG.SERVICES.AUTH_SERVICE) private readonly authClient: ClientKafka
  ) {}

  async onModuleInit() {
    Object.values(KAFKA_CONFIG.TOPICS.AUTH).forEach(topic => {
      this.authClient.subscribeToResponseOf(topic);
    });
    await this.authClient.connect();
  }

  @Post('login')
  @UsePipes(ZodValidationPipe) 
  async login(@Body() loginData: LoginDto) {
    return firstValueFrom(
      this.authClient.send(KAFKA_CONFIG.TOPICS.AUTH.LOGIN, loginData)
    ).catch((err:{status:number, message:string}) => {
      this.logger.error(err);
      throw new HttpException(err.message, err.status);
    });
  }

  @Post('register')
  @UsePipes(ZodValidationPipe) 
  async register(@Body() registerData: RegisterDto) {
    return firstValueFrom(
      this.authClient.send(KAFKA_CONFIG.TOPICS.AUTH.REGISTER, registerData)
    ).catch((err:{status:number, message:string}) => {
      this.logger.error(err);
      throw new HttpException(err.message, err.status);
    });
  }

  @Post('logout')
  async logout(@Body() logoutData: any) {
    return firstValueFrom(
      this.authClient.send(KAFKA_CONFIG.TOPICS.AUTH.LOGOUT, logoutData)
    ).catch((err:{status:number, message:string}) => {
      this.logger.error(err);
      throw new HttpException(err.message, err.status);
    });
  }

  @Post('refresh-token')
  async refreshToken(@Body() refreshData: any) {
    return firstValueFrom(
      this.authClient.send(KAFKA_CONFIG.TOPICS.AUTH.REFRESH_TOKEN, refreshData)
    );
  }
  @Post('reset-password')
  async resetPassword(@Body() resetData: any) {
    return firstValueFrom(
      this.authClient.send(KAFKA_CONFIG.TOPICS.AUTH.RESET_PASSWORD, resetData)
    );
  }
  @Get('google')
  async googleAuth() {
    return firstValueFrom(
      this.authClient.send(KAFKA_CONFIG.TOPICS.AUTH.GOOGLE, {})
    );
  }
  @Get('google/callback')
  async googleAuthCallback() {
    return firstValueFrom(
      this.authClient.send(KAFKA_CONFIG.TOPICS.AUTH.GOOGLE_CALLBACK, {})
    );
  }
  @Get('google/success')
  async googleSuccess(@Query('token') token: string) {
    return firstValueFrom(
      this.authClient.send(KAFKA_CONFIG.TOPICS.AUTH.GOOGLE_SUCCESS, { token })
    );
  }
  @Get('yandex')
  async yandexAuth() {
    return firstValueFrom(
      this.authClient.send(KAFKA_CONFIG.TOPICS.AUTH.YANDEX, {})
    );
  }
  @Get('yandex/callback')
  async yandexAuthCallback() {
    return firstValueFrom(
      this.authClient.send(KAFKA_CONFIG.TOPICS.AUTH.YANDEX_CALLBACK, {})
    );
  }
  @Get('yandex/success')
  async yandexSuccess(@Query('token') token: string) {
    return firstValueFrom(
      this.authClient.send(KAFKA_CONFIG.TOPICS.AUTH.YANDEX_SUCCESS, { token })
    );
  }
} 