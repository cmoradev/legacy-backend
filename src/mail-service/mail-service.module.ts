import { Module } from '@nestjs/common';
import { MailService } from './mail-service.service';
import { MailServiceController } from './mail-service.controller';

@Module({
    providers: [MailService],
    controllers: [MailServiceController],
})
export class MailServiceModule {
}
