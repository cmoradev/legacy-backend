import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreSalePayment } from './entities/mini-store-sale-payment.entity';
import { MiniStoreSalesPaymentsService } from './mini-store-sales-payments.service';
import { convertPaymentsReport } from './reports/payments.util';
import { InvoiceMethodsPaymentsService } from '../../../invoice/invoice-methods-payments/invoice-methods-payments.service';
import { QueryBilling, QuerySimpleReport } from './interface/InvoiceMiniStore.interface';
import { ConceptsPriceByPaymentBillig } from '../../../common/point-of-sale/miniStore-point-of-sale';
import {
    CFDI,
    Comprobante,
    Concepts,
    Emisor,
    Impuestos,
    Receptor,
    Relacionado,
} from '@signati/core';
import { XmlConceptoAttributes } from '@signati/core/lib/signati/types/Tags/concepts.interface';
import { mul } from 'exact-math';
import { mulQuantity, subQuantity, sumQuantity } from '../../../common/point-of-sale/point-of-sale';
import { Authentication } from 'sw-sdk-nodejs';
import { FactSw } from '../../../webService/FactSw';
import * as moment from 'moment-timezone';
import { FactMod } from '../../../webService/factMod';
import { ivaFromFinalAmount } from '../../../common/numbers';

@Crud({
    model: {
        type: MiniStoreSalePayment,
    },
    query: {
        limit: 200,
        join: {
            agent: {},
            miniStoreSaleMethodPayments: {},
            'miniStoreSaleMethodPayments.invoiceMethodPayment': {},
            miniStoreInvoices: {},
            miniStoreSale: {},
        },
    },
})
@Controller()
export class MiniStoreSalesPaymentsController implements CrudController<MiniStoreSalePayment> {
    constructor(
        readonly service: MiniStoreSalesPaymentsService,
        readonly invoiceMethodsPaymentsService: InvoiceMethodsPaymentsService,
    ) {
    }

    get base(): CrudController<MiniStoreSalePayment> {
        return this;
    }

    @Get('/simple-report')
    async simpleReport(@Req() request, @Res() response, @Query() query: QuerySimpleReport) {

        const payments = await this.service.fetchFilteredPayments(query);
        const sales = await this.service.fetchFilteredSales(query);
        const salesReturns = await this.service.fetchFilteredReturns(query);
        const result = {
            payments: {
                matriz: [],
                payments: [],
            },
            sales: [],
            returns: [],
            file: '',
        };
        if (query.onlyFile) {
            result.file = await this.service.simpleReport(payments, sales, salesReturns, { base64: true });
        } else {
            const cashiers = await this.service.getUserCasher();
            const paymenMethods = await this.invoiceMethodsPaymentsService.repo.find({
                where: {
                    showReport: true,
                    isActive: true,
                },
            });
            const viewPayments = convertPaymentsReport(payments, cashiers, paymenMethods);
            result.payments = viewPayments;
        }
        response.send(result);
        //
        // response.status(200);
        // response.send(query.onlyFile ? result : payments);
    }

    @Get('billing')
    async billing(@Req() request, @Res() response, @Query() query: QueryBilling) {
        const sw = new FactSw();
        const fm = new FactMod();
        const fecha = moment.tz('America/Mexico_City').format('YYYY-MM-DDThh:mm:ss');
        const result = await this.service.findSaleByPayment(query);
        const factura = ConceptsPriceByPaymentBillig(result.payment, result.sale.miniStoreSaleDetails);

        const key = '/home/misael/Documents/misproyectos/signati/Node/cfdi/server/api/controllers/cfdi/FIEL_XAMA620210DQ5_20190528163522/CSD_XAMA620210DQ5_20190528180059/CSD_ALBA_XKARAJAM_MENDEZ_XAMA620210DQ5_20190528_180046.key';
        const cer = '/home/misael/Documents/misproyectos/signati/Node/cfdi/server/api/controllers/cfdi/FIEL_XAMA620210DQ5_20190528163522/CSD_XAMA620210DQ5_20190528180059/CSD_ALBA_XKARAJAM_MENDEZ_XAMA620210DQ5_20190528_180046s.cer';


        const comprobanteAttribute: Comprobante = {
            Serie: 'E',
            Folio: 'ACACUN-27',
            Fecha: fecha,
            Sello: '',
            FormaPago: '01',
            NoCertificado: '',
            Certificado: '',
            // condicionesDePago: 'Contado',
            SubTotal: factura.subtotal.toString(),
            Descuento: factura.discount.toString(),
            Moneda: 'MXN',
            Total: factura.total.toString(),
            TipoDeComprobante: 'I',
            MetodoPago: 'PUE',
            LugarExpedicion: '77728',
        };
        console.log(factura.total.toString());

        const cfd = new CFDI(comprobanteAttribute);


        const emisor = new Emisor({
            Rfc: 'XAMA620210DQ5',
            Nombre: 'aaasdads',
            RegimenFiscal: '605',
        });
        await cfd.emisor(emisor);

        const receptor = new Receptor({
            Rfc: 'XAXX010101000',
            Nombre: 'PUBLICO EN GENERAL',
            UsoCFDI: 'G01',
        });
        await cfd.receptor(receptor);
        let totalTranslado = '0.00';
        for (const detalle of factura.detalles) {
            const concepto = new Concepts({
                ClaveProdServ: detalle.claveProd,
                NoIdentificacion: '23243012',
                Cantidad: detalle.quantity,
                ClaveUnidad: 'E48',
                Unidad: 'Pieza',
                Descripcion: detalle.descrption,
                ValorUnitario: detalle.unitPrice,
                Importe: detalle.importe,
                Descuento: detalle.discount,
            } as XmlConceptoAttributes);

            concepto.traslado({
                Base: subQuantity(detalle.importe, detalle.discount).toString(),
                Impuesto: '002',
                TipoFactor: 'Tasa',
                TasaOCuota: '0.160000',
                Importe: mulQuantity(subQuantity(detalle.importe, detalle.discount), .16).toString(),
            });
            totalTranslado = sumQuantity(mulQuantity(subQuantity(detalle.importe, detalle.discount), .16), totalTranslado).toString();
            await cfd.concepto(concepto);
        }

        const impuesto: Impuestos = new Impuestos({
            TotalImpuestosTrasladados: totalTranslado,
        });

        impuesto.traslados({
            Impuesto: '002',
            TipoFactor: 'Tasa',
            TasaOCuota: '0.160000',
            Importe: totalTranslado,
        });
        await cfd.impuesto(impuesto);
        await cfd.certificar(cer);
        await cfd.sellar(key, '12345678a');
        const xml = await cfd.getXmlCdfi();
        try {

            // console.log(await sw.getToken());


            const timbrado = await sw.facturar(xml);
            console.log(timbrado);
            response.set('Content-Type', 'text/xml');
            response.send(xml);

        } catch (e) {
            response.send(e);
            console.log(e);
        }
    }
}
