import { Test, TestingModule } from '@nestjs/testing';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';
import { Logger } from '@nestjs/common';
import { MailService } from './mail.service';
import {
  MAIL_EVENT_PATTERN,
  MAIL_TEMPLATES,
  MailSendOptions,
} from './mail.interfaces';

/**
 * Mock the AMQP provider module so we don't trigger its transitive
 * `ConfigModule` instantiation, which requires a populated `.env`
 * file. We only need the `AmqpTails` enum here.
 */
jest.mock('../transports/amqp-provider', () => ({
  AmqpTails: { MAIL_QUEUE: 'mailing_queue' },
}));

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { AmqpTails } = require('../transports/amqp-provider');

describe('MailService', () => {
  let service: MailService;
  let emitSpy: jest.Mock;
  let mockClient: ClientProxy;

  const buildOptions = (
    overrides: Partial<MailSendOptions> = {},
  ): MailSendOptions => ({
    to: 'user@example.com',
    subject: 'Subject',
    template: MAIL_TEMPLATES.CFDI_ISSUED,
    attachments: [
      {
        filename: 'invoice.pdf',
        contentType: 'application/pdf',
        content: Buffer.from('pdf-bytes'),
      },
    ],
    ...overrides,
  });

  beforeEach(async () => {
    emitSpy = jest.fn();
    mockClient = {
      emit: emitSpy,
    } as unknown as ClientProxy;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        { provide: AmqpTails.MAIL_QUEUE, useValue: mockClient },
      ],
    }).compile();

    service = module.get<MailService>(MailService);

    // Silence the service logger during tests.
    jest.spyOn(Logger.prototype, 'log').mockImplementation(() => undefined);
    jest.spyOn(Logger.prototype, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('publishes a payload without a `context` property', async () => {
    emitSpy.mockReturnValue(of(undefined));

    const result = await service.sendEmail(
      buildOptions({ context: { html: '<p>should-be-ignored</p>' } }),
    );

    expect(result).toEqual({ published: true, error: null });
    expect(emitSpy).toHaveBeenCalledTimes(1);

    const [pattern, payload] = emitSpy.mock.calls[0];

    expect(pattern).toBe(MAIL_EVENT_PATTERN);
    expect(payload).not.toHaveProperty('context');
    expect(payload).toEqual({
      to: 'user@example.com',
      subject: 'Subject',
      template: MAIL_TEMPLATES.CFDI_ISSUED,
      lang: 'es',
      attachments: [
        {
          filename: 'invoice.pdf',
          contentType: 'application/pdf',
          content: Buffer.from('pdf-bytes'),
        },
      ],
    });
  });

  it.each([
    ['CFDI_ISSUED', MAIL_TEMPLATES.CFDI_ISSUED],
    ['CFDI_CANCELLATION', MAIL_TEMPLATES.CFDI_CANCELLATION],
    ['PAYMENT_RECEIPT', MAIL_TEMPLATES.PAYMENT_RECEIPT],
    ['PURCHASE_ORDER', MAIL_TEMPLATES.PURCHASE_ORDER],
  ])(
    'forwards the canonical template identifier (%s)',
    async (_label, template) => {
      emitSpy.mockReturnValue(of(undefined));

      await service.sendEmail(buildOptions({ template }));

      const [, payload] = emitSpy.mock.calls[0];
      expect(payload.template).toBe(template);
      expect(payload).not.toHaveProperty('context');
    },
  );

  it('uses `es` as the default language when none is provided', async () => {
    emitSpy.mockReturnValue(of(undefined));

    await service.sendEmail(buildOptions());

    const [, payload] = emitSpy.mock.calls[0];
    expect(payload.lang).toBe('es');
  });

  it('preserves an explicit language override', async () => {
    emitSpy.mockReturnValue(of(undefined));

    await service.sendEmail(buildOptions({ lang: 'en' }));

    const [, payload] = emitSpy.mock.calls[0];
    expect(payload.lang).toBe('en');
  });

  it('returns published:false when the broker rejects the event', async () => {
    const brokerError = new Error('broker offline');
    emitSpy.mockReturnValue(
      new Observable((subscriber) => {
        subscriber.error(brokerError);
      }),
    );

    const result = await service.sendEmail(buildOptions());

    expect(result.published).toBe(false);
    expect(result.error).toBe(brokerError);
  });

  it('returns published:false when emit throws synchronously', async () => {
    const syncError = new Error('cannot build packet');
    emitSpy.mockImplementation(() => {
      throw syncError;
    });

    const result = await service.sendEmail(buildOptions());

    expect(result.published).toBe(false);
    expect(result.error).toBe(syncError);
  });

  it('omits the `attachments` key when no attachments are provided', async () => {
    emitSpy.mockReturnValue(of(undefined));

    await service.sendEmail({
      to: 'user@example.com',
      subject: 'Subject',
      template: MAIL_TEMPLATES.PAYMENT_RECEIPT,
    });

    const [, payload] = emitSpy.mock.calls[0];
    expect(payload.attachments).toEqual([]);
    expect(payload).not.toHaveProperty('context');
  });
});