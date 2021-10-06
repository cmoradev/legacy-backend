import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CrudController } from '@nestjsx/crud';
import { XmlCdfi, XmlReceptorAttribute } from '@signati/core';
import { XmlToJson } from '@signati/pdf';
import { ConfigService } from '../common/config/config.service';
import { ConceptWithTaxes, InvoiceSat } from '../credit-note-academy/credit-note-academy.service';
import { MiniStoreInvoice } from '../mini-store/store-sales/mini-store-invoices/entities/mini-store-invoice.entity';
import { FactSw } from '../webService/FactSw';
import { CreditNoteStoreService } from './credit-note-store.service';
import { CreditNoteStore } from './entities/credit-note-store.entity';
import * as fs from 'fs';
@Controller('credit-note-store')
export class CreditNoteStoreController implements CrudController<CreditNoteStore>{
    constructor(readonly service: CreditNoteStoreService,
        readonly smartWebService: FactSw,
        readonly configService: ConfigService) {
    }

    @Post('/generate-credit-note')
    async generateCreditNote(
        @Body() request: {
            invoice: InvoiceSat,
            receiver: Partial<XmlReceptorAttribute>,
            concepts: ConceptWithTaxes[],
            invoicesRelations: MiniStoreInvoice[],
            branchOfficeId: string | number,
            branchOfficeModuleId: string | number,
            userCreatorId: string | number
        }): Promise<void> {
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
            const workPath = this.configService.getPath();
            const xmlCreditNote = await this.service.createCreditNote(
                request.invoice,
                request.receiver,
                request.concepts,
                request.invoicesRelations,
                request.branchOfficeId,
                request.branchOfficeModuleId,
                workPath,
            );
            const timbrado = await this.smartWebService.facturar(xmlCreditNote);
            const pathXml = `${this.configService.getPath()}/comprobantes/notas-credito/` + timbrado.data.uuid.toUpperCase() + '.xml';
            fs.writeFileSync(pathXml, timbrado.data.cfdi);
            const cfdi: XmlCdfi = await XmlToJson(pathXml);
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
            console.log(err);
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
