import { Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces';
import { ClientProxy } from '@nestjs/microservices';
import { KAFKA_CONFIG } from '@marketplacer/configuration';
import { lastValueFrom } from 'rxjs';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(JwtStrategy.name);
    constructor(
        private readonly configService: ConfigService,
        @Inject(KAFKA_CONFIG.SERVICES.USER_SERVICE) private readonly userServiceClient: ClientProxy
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    async validate(payload: JwtPayload) {
        const user: User = await lastValueFrom(this.userServiceClient.send(KAFKA_CONFIG.TOPICS.USER.GET_USER_BY_ID, payload.id)).catch((err) => {
            this.logger.error(err);
            return null;
        });
        if (!user || user.is_blocked) {
            throw new UnauthorizedException();
        }
        return payload;
    }
}
