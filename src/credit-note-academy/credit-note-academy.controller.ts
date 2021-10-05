import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Comprobante, XmlCdfi, XmlEmisorAttribute, XmlReceptorAttribute } from '@signati/core';
import { ConfigService } from '../common/config/config.service';
import { FactSw } from '../webService/FactSw';
import { ConceptWithTaxes, CreditNoteAcademyService } from './credit-note-academy.service';
import { CreditNoteAcademy } from './entities/credit-note-academy.entity';
import * as fs from 'fs';
import { XmlToJson } from '@signati/pdf';
import { InvoiceType } from '../mini-store/store-sales/mini-store-invoices/enums/invoice-type.enum';
import { InvoiceStatus } from '../invoice/types/invoice-status';
import { BranchOffice } from '../system/branch-office/entities/branch-office.entity';
import { User } from '../system/users/entities/user.entity';
import { AcademyChargeInvoice } from '../academy/charges-academy/academy-charge-invoice/entities/academy-charge-invoice.entity';

@Crud({
    model: {
        type: CreditNoteAcademy,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null
            },
        },
        join: {

        }
    }
})
@Controller('credit-note-academy')
export class CreditNoteAcademyController implements CrudController<CreditNoteAcademy> {
    constructor(readonly service: CreditNoteAcademyService, readonly configService: ConfigService, readonly smartWebService: FactSw) {
    }

    @Post('/generate-credit-note')
    async generateCreditNote(
        @Body() request: {
            invoice: Partial<Comprobante>,
            receiver: Partial<XmlReceptorAttribute>,
            concepts: ConceptWithTaxes[],
            invoicesRelations: AcademyChargeInvoice[],            
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
        if(!request.userCreatorId) {
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
            await this.service.saveCreditNote(cfdi, timbrado, request.invoicesRelations, request.branchOfficeId, request.userCreatorId);
        } catch (err) {
            console.log(err);
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/get-folio')
    async getfolio(): Promise<Number> {
        return await this.service.getFolio();
    }
}
