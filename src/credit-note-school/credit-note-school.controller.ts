import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post, Put,
    Query,
    Res
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { XmlCdfi, XmlReceptorAttribute } from '@signati/core';
import { XmlToJson } from '@signati/pdf';
import * as fs from 'fs';
import { ConfigService } from '../common/config/config.service';
import { Public } from '../common/docorators/public.decorator';
import { ConceptWithTaxes, InvoiceSat } from '../credit-note-academy/credit-note-academy.service';
import { SchoolChargesInvoice } from '../school-colegio-ingles/charges-school/school-charges-invoice/entities/school-charges-invoice.entity';
import { FactSw } from '../webService/FactSw';
import { CreditNoteSchoolService } from './credit-note-school.service';
import { CreditNoteSchool } from './entities/credit-note-school.entity';
import { Response } from 'express';
import { CreditNote } from '../common/utils/invoice/generator/creditNote';
import { ConceptsPriceByPaymentBillig } from '../common/point-of-sale/point-of-sale';
import {SchoolChargePayment} from '../school-colegio-ingles/charges-school/school-charges-payments/entities/school-charge-payment.entity';

@Crud({
    model: {
        type: CreditNoteSchool,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null
            },
        },
        limit: 10,
        join: {
            invoiceBranchOffice: {},
            agentBilling: {},
            agentCanceling: {},
            invoiceSchool: {}
        }
    }
})
@Controller('credit-note-school')
export class CreditNoteSchoolController implements CrudController<CreditNoteSchool>{
    constructor(readonly service: CreditNoteSchoolService,
        readonly smartWebService: FactSw,
        readonly configService: ConfigService) {
    }

    @Delete('soft-deleted/:id')
    public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softDeleteOne(id);
    }

    @Put('soft-restore/:id')
    public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softRestoreOne(id);
    }

    @Post('generate/credit-note')
    async generateCreditNote(
        @Body() request: {
            invoice: InvoiceSat,
            receiver: Partial<XmlReceptorAttribute>,
            concepts: ConceptWithTaxes[],
            invoicesRelations: SchoolChargesInvoice[],
            branchOfficeId: string | number,
            branchOfficeModuleId: string | number,
            userCreatorId: string | number
        }
    ): Promise<void> {


        if (!request) {
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        }
        if (!request.invoice) {
            throw new HttpException('Invoice data is required', HttpStatus.BAD_REQUEST);
        }
        if (!request.receiver) {
            throw new HttpException('Receiver data is required', HttpStatus.BAD_REQUEST);
        }
        if (typeof request.concepts === 'undefined' || request.concepts.length === 0) {
            throw new HttpException('Must send al least one concept', HttpStatus.BAD_REQUEST);
        }
        if (!request.branchOfficeId) {
            throw new HttpException('branchOfficeId data is required', HttpStatus.BAD_REQUEST);
        }
        if (!request.branchOfficeModuleId) {
            throw new HttpException('branchOfficeModuleId data is required', HttpStatus.BAD_REQUEST);
        }
        if (!request.userCreatorId) {
            throw new HttpException('userCreatorId data is required', HttpStatus.BAD_REQUEST);
        }
        try {
            const detalles = ConceptsPriceByPaymentBillig({
                details: request.concepts as any[],
                payment: {
                    quantity: +request.invoice.Total,
                    change: 0
                } as SchoolChargePayment,
                type: 2,
                ivaDefault: 1,
                ivaByDetail: 0,
            });
            const workPath = this.configService.getPath();
            const branchOfficeSetting = await this.service.branchOfficeSetting(request.branchOfficeId, request.branchOfficeModuleId)
            const xmlCreditNote = await CreditNote({
                concepts: detalles.detalles,
                impuestos: detalles.impuestos,
                invoice: {
                    ...request.invoice,
                    Total: detalles.total.toString(),
                    SubTotal: detalles.subtotal.toString(),
                    Descuento: detalles.discount.toString()
                },
                receiver: request.receiver,
                relations: request.invoicesRelations,
                settingsBranchOffice: branchOfficeSetting,
                env: {
                    instancePath: workPath,
                    xslt: this.configService.getXsltPath()
                }
            })

            const timbrado = await this.smartWebService.facturar(xmlCreditNote);
            const pathXml = `${this.configService.getPath()}comprobantes/notas-credito/` + timbrado.data.uuid.toUpperCase() + '.xml';
            fs.writeFileSync(pathXml, timbrado.data.cfdi);
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
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/folio')
    async getFolio() {
        return await this.service.getLastFolio()
    }

    @Public()
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

    @Public()
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

    @Post('/send-credit-note')
    async sendMail(@Body() request, @Res() response: Response) {
        if (!request.branchOfficeId) {
            throw new HttpException('branchOfficeId is required', HttpStatus.BAD_REQUEST);
        }
        if (!request.email) {
            throw new HttpException('email is required', HttpStatus.BAD_REQUEST);
        }
        if (!request.invoice) {
            throw new HttpException('uuid invoice is required', HttpStatus.BAD_REQUEST);
        }
        try {
            const invoice = `${this.configService.getPath()}comprobantes/notas-credito/` + request.invoice.toUpperCase();
            await this.service.sendMail(request.branchOfficeId, request.email, invoice, request.invoice);
            response.status(HttpStatus.CREATED).send();
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
