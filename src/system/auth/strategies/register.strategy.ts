import { Strategy } from 'passport-local';
import {
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class RegisterStrategy extends Strategy {
    public name: string = 'local-register';

    constructor(
        private readonly authService: AuthService,
    ) {
        super(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true,
            },
            async (req: Request, email: string, password: string, done: (err: any, user?: any) => void): Promise<void> => {
                const { name, role, lastnameMother, lastnameFather, campus, department, status  } = req.body;
                const user: any = await this.authService.registerUserIfNotExist({
                    name,
                    email,
                    passw: password,
                    role,
                    status,
                    lastnameMother,
                    lastnameFather,
                    campus,
                    department,
                });
                if (!user) {
                    // tslint:disable-next-line:new-parens
                    return done(new UnauthorizedException, user);
                }
                return done(null, user);
            },
        );
    }
}
