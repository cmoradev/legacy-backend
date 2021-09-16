import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { ConfigService } from '../../common/config/config.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
    constructor(readonly configService: ConfigService) {
    }

    createJwtOptions(): JwtModuleOptions {
        return {
            secret: this.configService.get('API_SECRET'),
            signOptions: { expiresIn: '7d' },
        };
    }
}
