import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { isDesktop } from './common/desktop/desktop.config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  getHello(): string {
    return 'Hello World! ' +  isDesktop ? 'muuyal' : this.configService.get('APP_NAME');
  }
}
