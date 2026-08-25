import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../../../common/docorators/public.decorator';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ) {
    // You can throw an exception based on either "info" or "err" arguments
    console.log(err, user);
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    const token = context
      .switchToHttp()
      .getRequest()
      .headers.authorization.replace('Bearer ', '');
    console.log(token);
    if (!token) {
      throw err || new UnauthorizedException();
    }
    console.log(user.exp * 1000, Date.now())
    if (Date.now() >= user.exp * 1000) {
      throw err || new UnauthorizedException('Expired token');
    }

    return user;
  }
}
