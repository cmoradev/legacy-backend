/**
 * Payload element describing a single file attachment that will travel
 * together with the email event published on the mail queue.
 */
export interface MailAttachmentPayload {
  filename: string;
  contentType?: string;
  content: Buffer;
}

/**
 * Input shape accepted by {@link MailService.sendEmail}.
 *
 * - `to`, `subject` and `template` are required.
 * - `template` must reference one of the keys declared in {@link MAIL_TEMPLATES}
 *   so the external mail consumer knows which renderer to apply.
 * - `lang` defaults to `es` when omitted.
 * - `context` is forwarded to the template renderer. When `context.html`
 *   is provided, it MUST be a pre-rendered HTML string (the consumer
 *   is responsible for sanitization and final wrapping); the local
 *   service does not interpret or escape it.
 * - `attachments` is an optional list of files to bundle with the email.
 */
export interface MailSendOptions {
  to: string;
  subject: string;
  template: string;
  lang?: string;
  context?: Record<string, any>;
  attachments?: MailAttachmentPayload[];
}

/**
 * Honest result of a mail publish attempt.
 *
 * `published` is `true` ONLY when the broker acknowledged the dispatch
 * without raising an error. The local service never invents a success:
 * if the publish fails (either synchronously while building the packet,
 * or asynchronously because the broker rejected the message), the
 * resolution is `{ published: false, error }` instead.
 */
export interface MailDispatchResult {
  published: boolean;
  error: Error | null;
}

/**
 * AMQP event pattern used to publish a "send one email" request onto the
 * mail queue. The consumer bound to {@link AmqpTails.MAIL_QUEUE} listens
 * for this pattern and is responsible for resolving the template,
 * rendering the body and performing the SMTP send.
 */
export const MAIL_EVENT_PATTERN = 'send.one.email';

/**
 * Canonical mail template identifiers shared with the external mail
 * consumer. Consumers MUST treat unknown keys as an error; this object
 * is the single source of truth so backend callers never embed raw
 * template strings inline.
 *
 * NOTE: This module only declares identifiers. Template definitions live
 * on the consumer side; do NOT create local template files for them.
 */
export const MAIL_TEMPLATES = {
  CFDI_ISSUED_NOTIFICATION: 'cfdi/issued-notification',
  CFDI_CANCELLATION_NOTIFICATION: 'cfdi/cancellation-notification',
  PAYMENT_RECEIPT: 'payments/payment-receipt',
  WAREHOUSE_ORDER: 'mini-store/warehouse-order',
};