import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

export type PopulatedRequest = Request & { user: { id: string } };

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        let payload;
        try {
            payload = await this.jwtService.verifyAsync(token);
        } catch {
            throw new UnauthorizedException('Invalid token!');
        }

        request['user'] = { id: payload.sub };

        return true;
    }

    private extractTokenFromHeader(ctx: Request): string | undefined {
        const [type, token] = ctx.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
