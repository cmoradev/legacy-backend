import { Module } from '@nestjs/common';
import { TransportsModule } from '../transports';
import { MailService } from './mail.service';

@Module({
  imports: [TransportsModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
