import { Provider } from '@nestjs/common';
import { Whatsapp } from '../webService/whatsapp.client';
import { existsSync } from 'fs';
import { join } from 'path';
import { Client, ClientSession } from 'whatsapp-web.js';

export const whatsapp: Provider<Whatsapp> = {
    provide: Whatsapp,
    useClass: Whatsapp,
    useFactory: (): Whatsapp => {
        const SESSION_FILE_PATH = 'session.json';
        let session: ClientSession = {} as ClientSession;
        if (existsSync(SESSION_FILE_PATH)) {
            session = require(join(__dirname, '..', 'sessions', SESSION_FILE_PATH));
        }
        const cl = new Whatsapp({
            puppeteer: {
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox', '--unhandled-rejections=strict'],
            },
            session,
        });

        return cl;
    },
};
