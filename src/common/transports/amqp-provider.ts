import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

export enum AmqpTails {
  MAIL_QUEUE = 'mailing_queue',
}

export class RMQModule {
  static forFeature(queue: AmqpTails) {
    return ClientsModule.registerAsync([
      {
        name: queue,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const amqpServers = configService.amqpServers;

          if (!amqpServers || amqpServers.length === 0) {
            throw new Error(
              'AMQP servers are not defined in the configuration',
            );
          }

          return {
            transport: Transport.RMQ,
            options: {
              urls: amqpServers,
              queue: queue,
              queueOptions: {
                durable: true,
              },
            },
          };
        },
      },
    ]);
  }
}
