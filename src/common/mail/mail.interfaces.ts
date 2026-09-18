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
 * - `context` remains part of the wire contract for backward compatibility
 *   with the external mail consumer, but internal callers MUST NOT set it:
 *   all canonical templates render their body on the consumer side and
 *   forwarding a `context` here would be ignored.
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
 * The KEY names (`CFDI_ISSUED`, `CFDI_CANCELLATION`, `PAYMENT_RECEIPT`,
 * `PURCHASE_ORDER`) are the canonical identifiers inside this codebase.
 * The VALUES are the external template identifiers resolved by the
 * mail consumer; they are intentionally kept on the `legacy/...` paths
 * until the consumer ships the new renderer names, so we do not break
 * any in-flight message while the migration is staged.
 *
 * NOTE: This module only declares identifiers. Template definitions live
 * on the consumer side; do NOT create local template files for them.
 */
export const MAIL_TEMPLATES = {
  CFDI_ISSUED: 'legacy/cfdi-issued-notification',
  CFDI_CANCELLATION: 'legacy/cfdi-cancellation-notification',
  PAYMENT_RECEIPT: 'legacy/payment-receipt',
  PURCHASE_ORDER: 'legacy/warehouse-order',
};