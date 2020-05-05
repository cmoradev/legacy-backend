import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {

    canActivate(context: ExecutionContext) {
        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session
        // console.log(context.switchToHttp().getRequest().headers.authorization.replace('Bearer ', ''));
        // throw new UnauthorizedException();
        return super.canActivate(context);
    }

    handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
        // You can throw an exception based on either "info" or "err" arguments
        if (context.switchToHttp().getRequest().headers.authorization) {
            console.log('check', context.switchToHttp().getRequest().headers.authorization.replace('Bearer ', ''));
        }
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}
