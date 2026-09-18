import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AmqpTails } from '../transports/amqp-provider';
import {
  MAIL_EVENT_PATTERN,
  MailAttachmentPayload,
  MailDispatchResult,
  MailSendOptions,
} from './mail.interfaces';

/**
 * MailService centraliza el envío de correos electrónicos delegando el
 * transporte SMTP al consumidor externo que escucha los eventos publicados
 * sobre la cola `AmqpTails.MAIL_QUEUE`.
 *
 * El payload se publica siempre con el evento `send.one.email` (ver
 * `MAIL_EVENT_PATTERN`); el consumidor externo es responsable de resolver
 * la plantilla indicada en `template` y de ejecutar el envío real.
 *
 * Contrato honesto: `sendEmail` devuelve una `Promise<MailDispatchResult>`
 * que se resuelve con `published: true` únicamente cuando el broker
 * confirma la publicación (la fuente Observable de `ClientProxy.emit`
 * emite sin error). Si la publicación falla — de forma síncrona durante
 * la construcción del paquete o asíncrona porque el broker rechazó el
 * mensaje — la promesa se resuelve con `published: false` y el `Error`
 * capturado en `error`. Nunca se reporta un éxito ficticio.
 */
@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    @Inject(AmqpTails.MAIL_QUEUE) private readonly client: ClientProxy,
  ) {}

  public sendEmail(options: MailSendOptions): Promise<MailDispatchResult> {
    const payload = this.buildPayload(options);

    return new Promise<MailDispatchResult>((resolve) => {
      const fail = (err: unknown): MailDispatchResult => {
        const error = err instanceof Error ? err : new Error(String(err));
        this.logger.error(
          `No se pudo publicar el evento ${MAIL_EVENT_PATTERN}: ${error.message}`,
          error.stack,
        );
        return { published: false, error };
      };

      let source: Observable<unknown>;
      try {
        source = this.client.emit(MAIL_EVENT_PATTERN, payload);
      } catch (err) {
        resolve(fail(err));
        return;
      }

      source.subscribe({
        next: () => {
          this.logger.log(`Correo enviado ${payload.template}: ${payload.to}`);
          return resolve({ published: true, error: null });
        },
        error: (err) => resolve(fail(err)),
      });
    });
  }

  private buildPayload(options: MailSendOptions) {
    const attachments: MailAttachmentPayload[] = (
      options.attachments ?? []
    ).map((attachment) => ({
      filename: attachment.filename,
      contentType: attachment.contentType,
      content: attachment.content,
    }));

    return {
      to: options.to,
      subject: options.subject,
      template: options.template,
      lang: options.lang ?? 'es',
      attachments,
    };
  }
}
