import { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';


export interface JwtPayload {
    id: string;
    username: string;
    roles: string[];
}


export const CurrentUser = createParamDecorator(
    (key: keyof JwtPayload, ctx: ExecutionContext): JwtPayload | Partial<JwtPayload> => {
        const request = ctx.switchToHttp().getRequest();
        return key ? request.user[key] : request.user;
    },
);