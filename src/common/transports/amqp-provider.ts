import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

export enum AmqpTails {
  MAIL_QUEUE = 'mailing_queue',
}

export class RMQModule {
  /**
   * Configura un cliente RMQ contra el broker declarado en
   * `ConfigService.amqpServers` y lo enlaza con la cola indicada.
   *
   * Opciones relevantes para la durabilidad de los mensajes:
   * - `queueOptions.durable: true` garantiza que la cola sobreviva a un
   *   reinicio del broker.
   * - `persistent: true` marca cada mensaje como persistente, de modo
   *   que RabbitMQ lo escribe a disco antes de confirmar la publicación.
   *   Combinado con la cola durable, asegura que los eventos de correo
   *   no se pierdan si el broker se reinicia mientras están en vuelo.
   */
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
              persistent: true,
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
