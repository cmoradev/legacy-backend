import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreInvoice } from './entities/mini-store-invoice.entity';
import { MiniStoreInvoicesService } from './mini-store-invoices.service';
import { CancelInvoiceMinistoreDto } from './dto/cancel.invoice.ministore.dto';
import { FacturacionModerna } from 'invoice-modern';
import { CheckInvoiceMinistoreDto } from './dto/check.invoice.ministore.dto';
import { CfdiClass, Concepto, Impuesto } from '@signati/sdk-node';
import axios from 'axios';
import { OptionsFactMod } from 'invoice-modern/lib/interfaces/FactMod';
import { JwtGuard } from 'src/system/auth/guards/jwt.guard';
import * as fs from 'fs';

// @UseGuards(JwtGuard)
@Crud({
    model: {
        type: MiniStoreInvoice,
    },
    query: {
        join: {
            miniStoreSalePayment: {},
            miniStoreSale: {},
            agentBilling: {},
            agentCanceling: {},
        },
    },
})
@Controller()
export class MiniStoreInvoicesController implements CrudController<MiniStoreInvoice> {
    option: OptionsFactMod = {
        'UserPass': '4a63456b4d5113c4fdd8f9c9539295db37bb0982',
        'UserID': 'WSI1503194J6',
        debug: 1,
        develoment: false,
        // 'UserPass': 'b9ec2afa3361a59af4b4d102d3f704eabdf097d4',
        // 'UserID': 'UsuarioPruebasWS',
        // 'emisorRFC': 'WSI1503194J6',
        // 'RFC': 'GUCE910701NHA',
    };

    constructor(
        readonly service: MiniStoreInvoicesService,
    ) {
    }

    get base(): CrudController<MiniStoreInvoice> {
        return this;
    }

    @Get('/pdf')
    public async pdf(@Req() req, @Res() res: Response, @Query() query: { uuid: string }) {
        try {
            const pdf64 = fs.readFileSync('/var/www/pdc/comprobantes/tienda/' + query.uuid + '.pdf');
            // data:application/pdf;base64,
            // data:application/pdf;filename=generated.pdf;base64,
            res.send({ src: 'data:application/pdf;base64,' + pdf64.toString('base64') });
        } catch (e) {
            res.send({ error: e }).status(400);
        }
    }

    @Post('cancel-invoice')
    async cancelInvoiceSwSmartweb(@Body() cancelInvoice: CancelInvoiceMinistoreDto, @Res() res: Response) {

    }

    @Get('report-invoice')
    public async reportInvoice(@Req() request, @Res() response, @Query() query: {
        startDate: string,
        endDate: string,
        billingAgent: number,
        status: number,
        data: string,
    }) {

        try {
            const dataReport = await this.service.reportInvoice(query);
            response.status(200);
            response.send(dataReport);
        } catch (e) {
            response.status(401);
            response.send(e.message);
        }

    }

    @Post('/cancelar')
    public async cancelInvoice(@Body() cancelInvoice: CancelInvoiceMinistoreDto, @Res() res: Response) {
        try {

            const factura = new FacturacionModerna(this.option);
            const response = await factura.cancelar('GUCE910701NHA', cancelInvoice.uuid);
            let status = 1; // factura activa
            if (response.Code === 'GT05') {
                status = 2; // factura cancelada
            }
            if (response.Code === 'GT11') {
                status = 3; // factura en proceso
            }
            const obj = {
                id: cancelInvoice.idInvoice,
                status,
                idCancelingAgent: cancelInvoice.idAgentCanceling,
                reasonCancellation: cancelInvoice.reasonCancellation,
            };
            const invoice = await this.service.changeStautsInvoice(obj);
            const payment = await this.service.changeStautsPayment(cancelInvoice.idSalePayment, status);
            const objresult = {
                idinvoice: cancelInvoice.idInvoice,
                status,
                message: response.Message,
                invoice,
                payment,
            };
            res.status(200);
            res.send(objresult);
        } catch (e) {
            res.status(400);
            res.send(e.message);
        }
        /*
          * Nuevos estados para la factura:
          * 1. Facturado
          * 2.- Cancelado
          * 3.- En cola
          * 4.- Rechazado
          * */
    }

    @Post('/checkstatusinvoice')
    async CheckStatusInvoice(@Body() checkInvoice: CheckInvoiceMinistoreDto, @Res() res: Response) {
        try {
            const factura = new FacturacionModerna(this.option);
            let total = '0';
            const totalxml = await factura.getTotalXml(`/var/www/pdc/comprobantes/tienda/${checkInvoice.uuid}.xml`);
            total = totalxml === checkInvoice.total ? checkInvoice.total : totalxml;
            const response = await factura.estadoCancelacion('GUCE910701NHA', checkInvoice.receptorRFC, checkInvoice.uuid, total);
            let status = 3;
            if (response.estado === 'Cancelado') {
                status = 2;
            }
            if (response.estado === 'Vigente') {
                // if (response.estatusCancelacion === 'Solicitud rechazada') {
                // status = 4;
                // }
            }
            const invoice = this.service.changeStautsInvoiceC(checkInvoice.idInvoice, status);
            const payment = await this.service.changeStautsPayment(checkInvoice.idSalePayment, status);

            const objresult = {
                idinvoice: checkInvoice.idInvoice,
                status,
                message: response,
                invoice,
                payment,
            };
            res.status(200);
            res.send(objresult);
        } catch (e) {

            res.status(400);
            res.send(e.message);
        }
    }

}
