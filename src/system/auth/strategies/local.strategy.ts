import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email',
            passReqToCallback: false,
        });
    }

    async validate(email, password, done: (err: any, user: any) => void) {
        await this.authService.validateUser(email, password)
            .then(user => done(null, user))
            .catch(err => done(err, false));
    }
}
