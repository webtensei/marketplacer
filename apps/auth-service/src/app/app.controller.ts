import { BadRequestException, Controller, Get, HttpStatus, Logger, Query, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { KAFKA_CONFIG } from '@marketplacer/configuration';
import { LoginDto, RegisterDto } from '@marketplacer/shared-models';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Cookie, handleTimeoutAndErrors, UserAgent } from '@marketplacer/shared-backend';
import { mergeMap } from 'rxjs';
import { map } from 'rxjs';
import { YandexGuard } from './guargs/yandex.guard';
import { GoogleGuard } from './guargs/google.guard';
import { Request, Response } from 'express';
import { Provider } from '@prisma/client';
import { Tokens } from './interfaces';


const REFRESH_TOKEN = 'refreshtokenmarketplacertenseimp';

// Define a type for the request object after the guard adds the user
interface RequestWithUser extends Request {
    user?: { [key: string]: any }; // Or a more specific type if available
}

@Controller()
export class AuthController {
    private readonly logger = new Logger(AuthController.name);
        
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  @MessagePattern(KAFKA_CONFIG.TOPICS.AUTH.LOGIN)
  async login(dto: LoginDto,  @Res() res: Response, @UserAgent() agent: string) {
    this.logger.error('login recieved',dto);
    const tokens = await this.authService.login(dto, agent);
    if (!tokens) {
        throw new BadRequestException(`Не получается войти с данными ${JSON.stringify(dto)}`);
    }
    this.setRefreshTokenToCookies(tokens, res);
  }

  @MessagePattern(KAFKA_CONFIG.TOPICS.AUTH.REGISTER)
  async register(dto: RegisterDto) {
    const user = this.authService.register(dto);
    // return new UserResponse(user);
    return user;
  }

  @MessagePattern(KAFKA_CONFIG.TOPICS.AUTH.LOGOUT)
  async logout(@Cookie(REFRESH_TOKEN) refreshToken: string, @Res() res: Response) {
    if (!refreshToken) {
        res.sendStatus(HttpStatus.OK);
        return;
    }
    await this.authService.deleteRefreshToken(refreshToken);
    res.cookie(REFRESH_TOKEN, '', { httpOnly: true, secure: true, expires: new Date() });
    res.sendStatus(HttpStatus.OK);
}
@MessagePattern(KAFKA_CONFIG.TOPICS.AUTH.REFRESH_TOKEN)
async refreshTokens(@Cookie(REFRESH_TOKEN) refreshToken: string, @Res() res: Response, @UserAgent() agent: string) {
      if (!refreshToken) {
          throw new UnauthorizedException();
      }
    const tokens = await this.authService.refreshTokens(refreshToken, agent);
    if (!tokens) {
        throw new UnauthorizedException();
    }
    this.setRefreshTokenToCookies(tokens, res);
}

private setRefreshTokenToCookies(tokens: Tokens, res: Response) {
    if (!tokens) {
        throw new UnauthorizedException();
    }
    res.cookie(REFRESH_TOKEN, tokens.refreshToken.token, {
        httpOnly: true,
        sameSite: 'lax',
        expires: new Date(tokens.refreshToken.expires_at),
        secure: this.configService.get('NODE_ENV', 'development') === 'production',
        path: '/',
    });
    res.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken });
}

@UseGuards(GoogleGuard)
@MessagePattern(KAFKA_CONFIG.TOPICS.AUTH.GOOGLE)
// eslint-disable-next-line @typescript-eslint/no-empty-function
googleAuth() {}

@UseGuards(GoogleGuard)
@MessagePattern(KAFKA_CONFIG.TOPICS.AUTH.GOOGLE_CALLBACK)
googleAuthCallback(@Req() req: RequestWithUser, @Res() res: Response) {
    // Add optional chaining for safety
    const token = req.user?.['accessToken']; 
    if (!token) {
        throw new UnauthorizedException('No access token found after Google login');
    }
    return res.redirect(`http://localhost:4750/api/auth/success-google?token=${token}`);
}

@MessagePattern(KAFKA_CONFIG.TOPICS.AUTH.GOOGLE_SUCCESS)
// eslint-disable-next-line @typescript-eslint/no-empty-function
successGoogle(@Query('token') token: string, @UserAgent() agent: string, @Res() res: Response) {
    return this.httpService.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`).pipe(
        mergeMap(({ data: { email } }) => this.authService.providerAuth(email, agent, Provider.GOOGLE)),
        map((data) => this.setRefreshTokenToCookies(data, res)),
        handleTimeoutAndErrors(),
    );
}

@UseGuards(YandexGuard)
@MessagePattern(KAFKA_CONFIG.TOPICS.AUTH.YANDEX)
// eslint-disable-next-line @typescript-eslint/no-empty-function
yandexAuth() {}

@UseGuards(YandexGuard)
@MessagePattern(KAFKA_CONFIG.TOPICS.AUTH.YANDEX_CALLBACK)
yandexAuthCallback(@Req() req: RequestWithUser, @Res() res: Response) {
    // Add optional chaining for safety
    const token = req.user?.['accessToken'];
    if (!token) {
        throw new UnauthorizedException('No access token found after Yandex login');
    }
    return res.redirect(`http://localhost:4750/api/auth/success-yandex?token=${token}`);
}

@MessagePattern(KAFKA_CONFIG.TOPICS.AUTH.YANDEX_SUCCESS)
// eslint-disable-next-line @typescript-eslint/no-empty-function
successYandex(@Query('token') token: string, @UserAgent() agent: string, @Res() res: Response) {
    return this.httpService.get(`https://login.yandex.ru/info?format=json&oauth_token=${token}`).pipe(
        mergeMap(({ data: { default_email } }) =>
            this.authService.providerAuth(default_email, agent, Provider.YANDEX),
        ),
        map((data) => this.setRefreshTokenToCookies(data, res)),
        handleTimeoutAndErrors(),
    );
}
}
