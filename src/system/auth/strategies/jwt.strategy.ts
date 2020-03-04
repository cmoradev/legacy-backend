import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../../config/config.service';
import { AuthService } from '../auth.service';
import { VerifyOptions } from 'jsonwebtoken';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        readonly authService: AuthService,
        readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('API_SECRET'),
            // secretOrKeyProvider?: any;
            // jwtFromRequest: JwtFromRequestFunction;
            issuer: 'https://api-colegio.telweb.app', // emisor
            // audience?: string;
            algorithms: [''],
            // ignoreExpiration?: boolean;
            // passReqToCallback?: boolean;
            // jsonWebTokenOptions?: VerifyOptions;
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}
