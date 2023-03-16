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
    Res,
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { XmlReceptorAttribute } from '@signati/core';
import { ConfigService } from '../common/config/config.service';
import { Public } from '../common/docorators/public.decorator';
import { InvoiceSat } from '../credit-note-academy/credit-note-academy.service';
import { SchoolChargesInvoice } from '../school-colegio-ingles/charges-school/school-charges-invoice/entities/school-charges-invoice.entity';
import { FactSw } from '../webService/FactSw';
import { CreditNoteSchoolService } from './credit-note-school.service';
import { CreditNoteSchool } from './entities/credit-note-school.entity';
import { CreditNote } from '../common/utils/invoice/generator/creditNote';
import { InvoiceStatus } from '../invoice/types/invoice-status';
import { User } from '../system/users/entities/user.entity';
import { BranchOffice } from '../system/branch-office/entities/branch-office.entity';
import { InvoiceType } from '../mini-store/store-sales/mini-store-invoices/enums/invoice-type.enum';
import { InvoiceModules } from '../common/point-of-sale/types.pos';

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
            concepts: any[],
            calculations: any,
            invoicesRelations: SchoolChargesInvoice[],
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
            const branchOfficeSetting = await this.service.branchOfficeSetting(request.branchOfficeId, request.branchOfficeModuleId)
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
                type: InvoiceModules.SCHOOL
            });

            const invoicesId = request.invoicesRelations.map((invoice) => {
                return invoice.id;
            })
            const creditNoteSchool: Partial<CreditNoteSchool> = {
                folio: `${request.invoice.Serie}-${request.invoice.Folio}`,
                uuid: timbrado.data.uuid,
                businessName: request.receiver.Nombre,
                rfc: request.receiver.Rfc,
                total: parseFloat(timbrado.Total),
                invoiceType: InvoiceType.expenses,
                status: InvoiceStatus.billed,
                invoiceBranchOffice: { id: request.branchOfficeId } as BranchOffice,
                agentBilling: { id: request.userCreatorId } as User,
                invoiceSchool: invoicesId as unknown as SchoolChargesInvoice[],
            }
            const creditNote = await this.service.saveCreditNote(creditNoteSchool);
            response.status(200);
            response.send({
                uuid: timbrado.data.uuid,
                invoice: creditNote,
                stamping: timbrado,
                msg: 'Nota de Crédito timbrada',
            });
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
    async sendMail(@Body() request, @Res() response) {
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
