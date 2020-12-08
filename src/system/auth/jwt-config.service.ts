import { JwtModuleOptions, JwtOptionsFactory, JwtService } from '@nestjs/jwt';
import { ConfigService } from '../../config/config.service';
import { Injectable } from '@nestjs/common';
import { isDesktop } from '../../common/desktop/desktop.config';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
    constructor(readonly configService: ConfigService) {
    }

    createJwtOptions(): JwtModuleOptions {
        return {
            secret: isDesktop ? 'API_SECRET' : this.configService.get('API_SECRET'),
            signOptions: { expiresIn: '7d' },
        };
    }
}
