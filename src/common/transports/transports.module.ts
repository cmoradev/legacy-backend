import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { AmqpTails, RMQModule } from './amqp-provider';

const mailQueueProvider = RMQModule.forFeature(AmqpTails.MAIL_QUEUE);

@Module({
  imports: [ConfigModule, mailQueueProvider],
  exports: [mailQueueProvider],
})
export class TransportsModule {}
