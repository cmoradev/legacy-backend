import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {} from 'passport-jwt';
import { PayloadToken } from '../../../common/types/jwt';
import { getAction, getFeature } from '@nestjsx/crud';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {

    canActivate(context: ExecutionContext) {
        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session
        // throw new UnauthorizedException();
        return super.canActivate(context);
    }

    handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
        // You can throw an exception based on either "info" or "err" arguments
        console.log('reques');
        if (!context.switchToHttp().getRequest().headers.authorization) {
            throw err || new UnauthorizedException();
        }
        const token = context.switchToHttp().getRequest().headers.authorization.replace('Bearer ', '');
        if (Date.now() >= user.exp * 1000) {
            throw err || new UnauthorizedException('Expired token');
        }

        if (err || !user) {
            throw err || new UnauthorizedException();
        }

        return user;
    }
}
