import { BadRequestException, ConflictException, HttpException, HttpStatus, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from '@marketplacer/shared-models';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './interfaces';
import { User } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { v4 } from 'uuid';
import { add } from 'date-fns';
import { Token, Provider } from '@prisma/client';
import { PrismaService } from '@marketplacer/prisma-client';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { KAFKA_CONFIG } from '@marketplacer/configuration';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(
        @Inject(KAFKA_CONFIG.SERVICES.USER_SERVICE) private userServiceClient: ClientProxy,
        private readonly jwtService: JwtService,
        private readonly prismaService: PrismaService,
    ) {}

    async refreshTokens(refreshToken: string, agent: string): Promise<Tokens> {
        const token = await this.prismaService.token.delete({ where: { token: refreshToken } });
        if (!token || new Date(token.expires_at) < new Date()) {
            throw new UnauthorizedException();
        }
        const user = await lastValueFrom(this.userServiceClient.send(KAFKA_CONFIG.TOPICS.USER.GET_USER_BY_ID, token.user_id));
        return this.generateTokens(user, agent);
    }

    async register(dto: RegisterDto) {
        const user: User = await lastValueFrom(this.userServiceClient.send(KAFKA_CONFIG.TOPICS.USER.GET_ONE, dto.username)).catch((err) => {
            this.logger.error(err);
            throw new ConflictException(err);
        });
        if (user) {
            throw new ConflictException('Пользователь с таким email уже зарегистрирован');
        }
        const createdUser = await lastValueFrom(this.userServiceClient.send(KAFKA_CONFIG.TOPICS.USER.CREATE, dto)).catch((err) => {
            this.logger.error(err);
            throw new BadRequestException('Не удалось создать пользователя');
        });
        return createdUser;
    }

    async login(dto: LoginDto, agent: string): Promise<Tokens> {
        const user: User = await lastValueFrom(this.userServiceClient.send(KAFKA_CONFIG.TOPICS.USER.GET_ONE, dto.username)).catch((err) => {
            this.logger.error(err);
            throw new UnauthorizedException(err);
        });
        if (!user || !compareSync(dto.password, user.password)) {
            throw new UnauthorizedException('Не верный логин или пароль');
        }
        return this.generateTokens(user, agent);
    }

    private async generateTokens(user: User, agent: string): Promise<Tokens> {
        const accessToken =
            'Bearer ' +
            this.jwtService.sign({
                id: user.id,
                username: user.username,
            });
        const refreshToken = await this.getRefreshToken(user.id, agent);
        return { accessToken, refreshToken };
    }

    private async getRefreshToken(user_id: string, user_agent: string): Promise<Token> {
        const _token = await this.prismaService.token.findFirst({
            where: {
                user_id,
                user_agent,
            },
        });
        const token = _token?.token ?? null;
        return this.prismaService.token.upsert({
            where: { token },
            update: {
                token: v4(),
                expires_at: add(new Date(), { months: 1 }),
            },
            create: {
                token: v4(),
                expires_at: add(new Date(), { months: 1 }),
                user_agent: user_agent,
                user_id: user_id,
            },
        });
    }

    deleteRefreshToken(token: string) {
        return this.prismaService.token.delete({ where: { token } });
    }

    async providerAuth(username: string, agent: string, provider: Provider) {
        const userExists = await lastValueFrom(this.userServiceClient.send(KAFKA_CONFIG.TOPICS.USER.GET_ONE, username));
        if (userExists) {
            const user = await lastValueFrom(this.userServiceClient.send(KAFKA_CONFIG.TOPICS.USER.CREATE, { username, provider })).catch((err) => {
                this.logger.error(err);
                return null;
            });
            return this.generateTokens(user, agent);
        }
        const user = await lastValueFrom(this.userServiceClient.send(KAFKA_CONFIG.TOPICS.USER.CREATE, { username, provider })).catch((err) => {
            this.logger.error(err);
            return null;
        });
        if (!user) {
            throw new HttpException(
                `Не получилось создать пользователя с username ${username} в Google auth`,
                HttpStatus.BAD_REQUEST,
            );
        }
        return this.generateTokens(user, agent);
    }
}