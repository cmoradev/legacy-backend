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

    @Get('/prueba')
    public async prueba(@Res() res: Response) {

        const cfdi = new CfdiClass({
            Serie: 'A',
            Folio: '2303240',
            // Fecha: 'asdasdasd',
            // condicionesDePago: 'CONTADO',
            // condicionesDePago: 'PUE',
            SubTotal: '1850',
            Descuento: '175.00',
            Moneda: 'MXN',
            Total: '1943.00',
            TipoDeComprobante: 'I',
            FormaPago: '03',
            MetodoPago: 'PUE',
            LugarExpedicion: '77728',
        });

        cfdi.emisor({
            Rfc: 'TCM970625MB1',
            Nombre: 'FACTURACION MODERNA SA DE CV',
            RegimenFiscal: '601',
        });
        cfdi.receptor({
            Rfc: 'XAXX010101000',
            Nombre: 'PUBLICO EN GENERAL',
            UsoCFDI: 'G01',
        });
        const concept = new Concepto({
            ClaveProdServ: '01010101',
            NoIdentificacion: 'AULOG001',
            Cantidad: '5',
            ClaveUnidad: 'H87',
            Unidad: 'Pieza',
            Descripcion: 'Aurriculares USB Logitech',
            ValorUnitario: '350.00',
            Importe: '1750.00',
            Descuento: '175.00',
        });
        concept.traslado({
            Base: '1575.00',
            Impuesto: '002',
            TipoFactor: 'Tasa',
            TasaOCuota: '0.160000',
            Importe: '252.00',
        });
        cfdi.concepto(concept);

        const concept2 = new Concepto({
            ClaveProdServ: '43201800',
            NoIdentificacion: 'USB',
            Cantidad: '1',
            ClaveUnidad: 'H87',
            Unidad: 'Pieza',
            Descripcion: 'Memoria USB 32gb marca Kingston',
            ValorUnitario: '100.00',
            Importe: '100.00',
        });
        concept2.traslado({
            Base: '100.00',
            Impuesto: '002',
            TipoFactor: 'Tasa',
            TasaOCuota: '0.160000',
            Importe: '16.00',
        });
        cfdi.concepto(concept2);

        const impuesto = new Impuesto({
            totalImpuestosTrasladados: '268.00',
        });
        impuesto.traslados([{
            Impuesto: '002',
            TipoFactor: 'Tasa',
            TasaOCuota: '0.160000',
            Importe: '268.00',
        }]);
        cfdi.impuesto(impuesto);

        // tslint:disable-next-line:no-shadowed-variable no-console
        console.log(cfdi.validateAll());
        try {
            const data: any = await axios.post('http://localhost:4000/timbrado/facturar', cfdi.getCfdi()).then((res: any) => {
                return res.data;
            });
            res.send(data);
        } catch (e) {
            res.send(e).status(400);
        }

        //  res.contentType('application/xml');

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
