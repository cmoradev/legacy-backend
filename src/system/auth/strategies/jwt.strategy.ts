import { ConfigService } from '../../../common/config/config.service';
import { AuthService } from '../auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly authService: AuthService,
    readonly configService: ConfigService,
  ) {
    console.log('API_SECRET: ',configService.get('API_SECRET'))
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('API_SECRET'),
    });
  }

  async validate(payload: any) {
    console.log('Payload: ', payload)
    return payload;
  }
}
