import { Client, ClientOptions, ClientSession } from 'whatsapp-web.js';
import * as Util from 'whatsapp-web.js/src/util/Util';
import { DefaultOptions } from 'whatsapp-web.js/src/util/Constants';

import { existsSync, writeFileSync } from 'fs';
import { join } from 'path';

// import { Emitter, On } from 'nest-event';

export class Whatsapp extends Client {
    // SESSION_FILE_PATH = 'session.json';
    // session: ClientSession = {} as ClientSession;

    // cliente: Client;
    options: ClientOptions = {};
    pupBrowser = null;
    pupPage = null;

    constructor(options: ClientOptions) {
        super({ ...options });
        this.options = Util.mergeDefault(DefaultOptions, options);
        // this.options = {};
        /*this.pupBrowser = null;
        this.pupPage = null;*/
        this.initialize();
    }

    /*async initialize(): Promise<void> {
      console.log('amir');
    }*/

}

//  const text = await QRCode.toDataURL(urlQr)
