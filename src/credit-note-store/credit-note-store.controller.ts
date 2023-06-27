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
import { XmlReceptorAttribute } from '@signati/core';
import { ConfigService } from '../common/config/config.service';
import { InvoiceSat } from '../credit-note-academy/credit-note-academy.service';
import { MiniStoreInvoice } from '../mini-store/store-sales/mini-store-invoices/entities/mini-store-invoice.entity';
import { FactSw } from '../webService/FactSw';
import { CreditNoteStoreService } from './credit-note-store.service';
import { CreditNoteStore } from './entities/credit-note-store.entity';
import * as fs from 'fs';
import { CreditNote } from '../common/utils/invoice/generator/creditNote';
import { InvoiceModules, RelateParams } from '../common/point-of-sale/types.pos';
import { InvoiceType } from '../mini-store/store-sales/mini-store-invoices/enums/invoice-type.enum';
import { InvoiceStatus } from '../invoice/types/invoice-status';
import { BranchOffice } from '../system/branch-office/entities/branch-office.entity';
import { User } from '../system/users/entities/user.entity';
import { MiniStoreInvoicesService } from '../mini-store/store-sales/mini-store-invoices/mini-store-invoices.service';

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
        limit: 10,
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
        readonly configService: ConfigService,
        readonly miniStoreSalesPaymentsService: MiniStoreInvoicesService) {
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
            concepts: any[],
            calculations: any,
            invoicesRelations: RelateParams[],
            branchOfficeId: string | number,
            branchOfficeModuleId: string | number,
            userCreatorId: string | number
        },
        @Res() response
    ){


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
            const branchOfficeSetting = await this.service.branchOfficeSetting(request.branchOfficeId, request.branchOfficeModuleId);
            
            const timbrado = await CreditNote({
                concepts: request.concepts,
                calculations: request.calculations,
                invoice: {
                    ...request.invoice,
                    SubTotal: request.calculations.subtotal,
                    Descuento: request.calculations.discounts,
                    Total: request.calculations.total,
                },
                receiver: request.receiver,
                relations: request.invoicesRelations,
                settingsBranchOffice: branchOfficeSetting,
                env: {
                    instancePath: workPath,
                    xslt: this.configService.getXsltPath()
                },
                type: InvoiceModules.STORE
            });
            
            const uuids: string[] = [];
            request.invoicesRelations.forEach((d)=>{
                return d.documents.forEach((dd)=>{
                    uuids.push(dd)
                })
            })
            const invoices = await this.miniStoreSalesPaymentsService.repo.createQueryBuilder('invoices')
            .select([
                'invoices.id'
            ])
            .where('invoices.uuid IN (:...uuids)', {
                uuids: uuids,
            })
            .getMany();
            const creditNoteStore: Partial<CreditNoteStore> = {
                folio: `${request.invoice.Serie}-${request.invoice.Folio}`,
                uuid: timbrado.data.uuid,
                businessName: request.receiver.Nombre,
                rfc: request.receiver.Rfc,
                total: parseFloat(timbrado.Total),
                invoiceType: InvoiceType.expenses,
                status: InvoiceStatus.billed,
                invoiceBranchOffice: { id: request.branchOfficeId } as BranchOffice,
                agentBilling: { id: request.userCreatorId } as User,
                invoiceStore: invoices,
            }
            const creditNote = await this.service.saveCreditNote(creditNoteStore);
            response.status(200);
            response.send({
                uuid: timbrado.data.uuid,
                invoice: creditNote,
                stamping: timbrado,
                msg: 'Nota de Crédito timbrada',
            });
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
