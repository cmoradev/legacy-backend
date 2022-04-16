import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { XmlCdfi, XmlReceptorAttribute } from '@signati/core';
import { XmlToJson } from '@signati/pdf';
import { ConfigService } from '../common/config/config.service';
import { ConceptWithTaxes, InvoiceSat } from '../credit-note-academy/credit-note-academy.service';
import { MiniStoreInvoice } from '../mini-store/store-sales/mini-store-invoices/entities/mini-store-invoice.entity';
import { FactSw } from '../webService/FactSw';
import { CreditNoteStoreService } from './credit-note-store.service';
import { CreditNoteStore } from './entities/credit-note-store.entity';
import * as fs from 'fs';
import { CreditNote } from '../common/utils/invoice/generator/creditNote';
import { ConceptsPriceByPaymentBillig } from '../common/point-of-sale/point-of-sale';
import { MiniStoreSalePayment } from '../mini-store/store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity';

@Crud({
    model: {
        type: CreditNoteStore,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null
            },
        },
        join: {
            invoiceBranchOffice: {},
            agentBilling: {},
            agentCanceling: {},
            invoiceStore: {}
        }
    }
})
@Controller('credit-note-store')
export class CreditNoteStoreController implements CrudController<CreditNoteStore>{
    constructor(readonly service: CreditNoteStoreService,
        readonly smartWebService: FactSw,
        readonly configService: ConfigService) {
    }

    @Get('generate/credit-note')
    async generateCreditNote(
        // @Body() request: {
        //     invoice: InvoiceSat,
        //     receiver: Partial<XmlReceptorAttribute>,
        //     concepts: ConceptWithTaxes[],
        //     invoicesRelations: MiniStoreInvoice[],
        //     branchOfficeId: string | number,
        //     branchOfficeModuleId: string | number,
        //     userCreatorId: string | number
        // }
    ): Promise<void> {
        const request = {
            "invoice": {
                "Serie": "A",
                "Folio": "2",
                "Fecha": "2022-04-16T01:46:32",
                FormaPago: "01",
                LugarExpedicion: "77725",
                MetodoPago: "PUE",
                "Moneda": "MXN", "TipoDeComprobante": "E", "condicionesDePago": "", "SubTotal": "517.24", "Total": 600
            },
            "receiver": {
                "businessName": "CALEB ISAAC MORA DIAZ", "rfc": "MODC980924HK1", "keyRegimen": "612", "regimenFiscalReceptor": "Personas Físicas con Actividades Empresariales y Profesionales", "domicilioFiscalReceptor": "77725", "Rfc": "MODC980924HK1", "Nombre": "CALEB ISAAC MORA DIAZ", "UsoCFDI": "G02", "DomicilioFiscalReceptor": "77725", "RegimenFiscalReceptor": "612"
            },
            "branchOfficeId": 1, "branchOfficeModuleId": 3,
            "invoicesRelations": [
                { "id": 98, "createdAt": "2022-04-01 16:29:06", "updatedAt": "2022-04-01 16:29:06", "deletedAt": null, "version": 2, "uuid": "DFE46E78-A76F-4CD8-8E29-D4CE7B75A868", "isGlobal": 1, "folio": "MYLF-99", "businessName": "CALEB ISAAC MORA DIAZ", "rfc": "MODC980924HK1", "total": "600.000000", "idBillingAgent": 0, "idCancelingAgent": 0, "cancellationDate": null, "reasonCancellation": null, "idSale": 0, "idPayment": 0, "invoiceType": "Income", "status": 1, "motivo": null, "folioSustitucion": null, "miniStoreSalePayment": { "id": 136, "createdAt": "2022-04-01 16:28:18", "updatedAt": "2022-04-01 16:29:09", "deletedAt": null, "version": 2, "uuid": "5b3e8622-5b27-4b98-ae34-dfb9083226c4", "globalUuid": null, "folio": "MYLP-134", "change": "0.000000", "quantity": "600.000000", "idSale": 0, "idStatusPayment": 1, "idAgentCancellation": 0, "dateCancellation": null, "reasonCancellation": null, "observations": "", "stamping": 1, "isIVA": 1, "paymentStatus": 2 }, "miniStoreSale": { "id": 145, "createdAt": "2022-04-01 16:28:18", "updatedAt": "2022-04-01 16:28:18", "deletedAt": null, "version": 1, "uuid": "6107a0c5-dcd8-42b4-a0d4-4adffe62e5b2", "folio": "MYLV-126", "quoteName": null, "statusSale": 2, "observations": "", "dateCancellation": null, "reasonCancellation": null, "iva": 16, "isComplete": 0, "expiredAt": null, "idAgentCancellation": 0, "isIVA": 1, "isDeferredPayments": 0, "change": "0.000000", "stamping": 0, "idInvoice": 0, "idModality": 1, "idPaymentMethod": null, "codePaymentMethod": null, "codeWayToPay": "0", "miniStoreSaleDetails": [{ "id": 245, "createdAt": "2022-04-01 16:28:18", "updatedAt": "2022-04-01 16:28:18", "deletedAt": null, "version": 1, "uuid": "70e1bbee-0e41-4bcd-b6bb-0083f41203e6", "productCode": "72154017", "productName": "Deposito de agua astra 98-2009", "quantity": "1.000000", "unitMeasurement": "H87", "objetoImp": "02", "priceWithIVA": "600.000000", "price": "517.240000", "isIva": 1, "extraCharges": [] }] }, "agentBilling": { "id": 1, "createdAt": "2021-11-11 16:04:58", "updatedAt": "2022-04-02 09:03:44", "deletedAt": null, "version": 1, "uuid": "dd828b00-5da1-11eb-ae93-0242ac130002", "name": "Admin", "lastnameFather": "", "lastnameMother": "", "email": "developers@munyaal.app", "password": "$2b$08$Lda.syP6E7eWiXx8ZzgQTeGU.0V1uGnxdZaOCLjRNHmwEN0Qt86wG", "rememberToken": null, "idCampus": 1, "idDepartment": 0, "idRole": 0, "isActive": 1, "img": "https://version.muunyal.app/muunyal.svg", "canAccessAnecdoticos": 0 }, "agentCanceling": null }], "concepts": [{ "id": 245, "createdAt": "2022-04-01 16:28:18", "updatedAt": "2022-04-01 16:28:18", "deletedAt": null, "version": 1, "uuid": "70e1bbee-0e41-4bcd-b6bb-0083f41203e6", "productCode": "72154017", "productName": "Deposito de agua astra 98-2009", "quantity": "1.000000", "unitMeasurement": "H87", "objetoImp": "02", "priceWithIVA": "600.00", "price": 517.24, "isIva": 1, "extraCharges": [] }
                ],
            "userCreatorId": 1,
            "informacionGlobal": { "Periodicidad": "", "Meses": "", "Año": "" }
        } as any
        const detalles = ConceptsPriceByPaymentBillig({
            details: request.concepts,
            payment: {
                quantity: request.invoice.total,
                change: 0
            } as MiniStoreSalePayment,
            type: 3,
        });

        // if (!request) {
        //     throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        // }
        // if (!request.invoice) {
        //     throw new HttpException('Invoice data is required', HttpStatus.BAD_REQUEST);
        // }
        // if (!request.receiver) {
        //     throw new HttpException('Receiver data is required', HttpStatus.BAD_REQUEST);
        // }
        // if (typeof request.concepts === 'undefined' || request.concepts.length === 0) {
        //     throw new HttpException('Must send al least one concept', HttpStatus.BAD_REQUEST);
        // }
        // if (!request.branchOfficeId) {
        //     throw new HttpException('branchOfficeId data is required', HttpStatus.BAD_REQUEST);
        // }
        // if (!request.branchOfficeModuleId) {
        //     throw new HttpException('branchOfficeModuleId data is required', HttpStatus.BAD_REQUEST);
        // }
        // if (!request.userCreatorId) {
        //     throw new HttpException('userCreatorId data is required', HttpStatus.BAD_REQUEST);
        // }
        try {
            const workPath = this.configService.getPath();
            const branchOfficeSetting = await this.service.branchOfficeSetting(request.branchOfficeId, request.branchOfficeModuleId);
            const xmlCreditNote = await CreditNote({
                concepts: detalles.detalles,
                invoice: request.invoice,
                receiver: request.receiver,
                relations: request.invoicesRelations,
                settingsBranchOffice: branchOfficeSetting,
                env: {
                    instancePath: workPath,
                    xslt: this.configService.getXsltPath()
                }
            })

            // @cfdiv4
            const timbrado = await this.smartWebService.facturar(xmlCreditNote);
            const pathXml = `${this.configService.getPath()}/comprobantes/notas-credito/` + timbrado.data.uuid.toUpperCase() + '.xml';
            fs.writeFileSync(pathXml, timbrado.data.cfdi);
            // @cfdiv4
            const cfdi = await XmlToJson(pathXml) as XmlCdfi;
            await this.service.saveCreditNote(
                cfdi,
                timbrado,
                request.invoicesRelations,
                request.branchOfficeId,
                request.branchOfficeModuleId,
                request.userCreatorId,
                workPath
            );
        } catch (err) {
            console.log(err)
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/folio')
    async getFolio() {
        return await this.service.getLastFolio()
    }

    @Get('/download-pdf')
    getPdfInvoice(@Query() request, @Res() response) {
        try {
            const workPath = this.configService.getPath();
            const xml = `${workPath}/comprobantes/notas-credito/${request.UUID}.pdf`;
            response.download(xml);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    @Get('/download-xml')
    async getXmlInvoice(@Query() request, @Res() response) {
        try {
            const workPath = this.configService.getPath();
            const xml = `${workPath}/comprobantes/notas-credito/${request.UUID}.xml`;
            response.download(xml);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
