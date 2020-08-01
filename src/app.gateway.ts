import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { Whatsapp } from './webService/whatsapp.client';
import { writeFileSync } from 'fs';
import { Client } from 'whatsapp-web.js';
// import { On } from 'nest-event';
import { join } from 'path';
import * as QRCode from 'qrcode';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('AppGateway');

    constructor(private whatsApp: Whatsapp) {
        // whatsApp.initialize();
    }

    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, payload: string): void {
        this.server.emit('msgToClient', payload);
    }

    afterInit(server: Server) {
        this.logger.log('Init');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    async handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
        this.whatsApp.on('qr', async (data) => {
            console.log(data);
            this.server.emit('qr2', {
                qr: await QRCode.toDataURL(data),
            });
        });
    }

}
