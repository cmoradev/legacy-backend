import { ConfigService } from '../../../config/config.service';
import { AuthService } from '../auth.service';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { PayloadToken } from '../../../common/types/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(readonly authService: AuthService, readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get('API_SECRET'),
        });
    }

    async validate(payload: PayloadToken) {
        if (Date.now() >= payload.exp * 1000) {
            throw  new UnauthorizedException('Expired token');
        }
        return payload;
    }
}
