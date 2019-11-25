import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
interface RequestSession extends Request {
    session: any;
}
@Injectable()
export class SessionGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request: RequestSession = context.switchToHttp().getRequest();

        return request.session
            ? request.session.passport
                ? request.session.passport.user
                : false
            : false;
    }
}
