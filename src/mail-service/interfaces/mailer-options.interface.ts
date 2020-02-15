import { ISendMailOptions } from '@nest-modules/mailer/dist/interfaces/send-mail-options.interface';

export interface MailerOptions extends ISendMailOptions {
    attachments?: any[];
}
