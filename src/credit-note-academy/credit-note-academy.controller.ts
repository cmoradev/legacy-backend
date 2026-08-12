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
import { AttributesComprobanteReceptorElement } from '@munyaal/cfdi';
import { CreditNote } from '../common/utils/invoice/generator/creditNote';
import { ConfigService } from '../common/config/config.service';
import { FactSw } from '../webService/FactSw';
import { CreditNoteAcademyService, InvoiceSat } from './credit-note-academy.service';
import { CreditNoteAcademy } from './entities/credit-note-academy.entity';
import { InvoiceModules } from '../common/point-of-sale/types.pos';
import { InvoiceType } from '../mini-store/store-sales/mini-store-invoices/enums/invoice-type.enum';
import { InvoiceStatus } from '../invoice/types/invoice-status';
import { BranchOffice } from '../system/branch-office/entities/branch-office.entity';
import { User } from '../system/users/entities/user.entity';
import { AcademyChargeInvoiceService } from '../academy/charges-academy/academy-charge-invoice/academy-charge-invoice.service';
import { readFileSync } from 'fs';
import { CancelInvoiceSwDto } from '../mini-store/store-sales/mini-store-invoices/dto/cancel.invoice.sw.dto';
import { BranchOfficeService } from '../system/branch-office/branch-office.service';
import { BranchOfficeSettingService } from '../system/branch-office-setting/branch-office-setting.service';
import { S3Service } from 'src/common/storage/s3.service';
import { ComprobanteDownloadService } from 'src/common/storage/comprobante-download.service';

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
        limit: 10,
        join: {
            invoiceBranchOffice: {},
            agentBilling: {},
            agentCanceling: {},
            invoicesAcademy: {}
        }
    }
})
@Controller('credit-note-academy')
export class CreditNoteAcademyController implements CrudController<CreditNoteAcademy> {
    constructor(
        readonly service: CreditNoteAcademyService, 
        readonly configService: ConfigService, 
        readonly smartWebService: FactSw,
        readonly academyChargeInvoiceService: AcademyChargeInvoiceService,
        readonly branchOffice: BranchOfficeService,
        readonly branchOfficeSettingService: BranchOfficeSettingService,
        private _s3Service: S3Service,
        private _comprobanteDownloadService: ComprobanteDownloadService
        ) {
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
            receiver: Partial<AttributesComprobanteReceptorElement>,
            concepts: any[],
            calculations: any,
            invoicesRelations: any[],
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
            const branchOfficeSetting = await this.service.branchOfficeSetting(request.branchOfficeId, request.branchOfficeModuleId,)

            const fullResult = await CreditNote({
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
                type: InvoiceModules.ACADEMY,
                s3Service: this._s3Service
            });

            const uuids: string[] = [];
            request.invoicesRelations.forEach((d)=>{
                return d.documents.forEach((dd)=>{
                    uuids.push(dd)
                })
            })
            const invoices = await this.academyChargeInvoiceService.repo.createQueryBuilder('invoices')
            .select([
                'invoices.id'
            ])
            .where('invoices.uuid IN (:...uuids)', {
                uuids: uuids,
            })
            .getMany();
            
            const creditNoteAcademy: Partial<CreditNoteAcademy> = {
                folio: `${request.invoice.Serie}-${request.invoice.Folio}`,
                uuid: fullResult.uuid,
                businessName: request.receiver.Nombre,
                rfc: request.receiver.Rfc,
                total: parseFloat(fullResult.total),
                invoiceType: InvoiceType.expenses,
                status: InvoiceStatus.billed,
                invoiceBranchOffice: { id: request.branchOfficeId } as BranchOffice,
                agentBilling: { id: request.userCreatorId } as User,
                invoicesAcademy: invoices,
            }
            const creditNote = await this.service.saveCreditNote(creditNoteAcademy);
            response.status(200);
            response.send({
                uuid: fullResult.uuid,
                invoice: creditNote,
                stamping: fullResult,
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
    async getPdfInvoice(
        @Query('UUID') UUID: string,
        @Query('regenerate') regenerate: boolean,
        @Query('cadenaOriginal') cadenaOriginal: string,
        @Res() response,
    ) {
        const file = await this._comprobanteDownloadService.downloadFile('notas-credito', UUID, 'pdf', {
            regenerate,
            cadenaOriginal,
        });
        this._comprobanteDownloadService.sendFile(response, file.buffer, file.contentType, file.filename);
    }

    @Get('/download-xml')
    async getXmlInvoice(
        @Query('UUID') UUID: string,
        @Query('regenerate') regenerate: boolean,
        @Query('cadenaOriginal') cadenaOriginal: string,
        @Res() response,
    ) {
        const file = await this._comprobanteDownloadService.downloadFile('notas-credito', UUID, 'xml', {
            regenerate,
            cadenaOriginal,
        });
        this._comprobanteDownloadService.sendFile(response, file.buffer, file.contentType, file.filename);
    }

    @Post('cancel-invoice')
  async cancelInvoiceSwSmartweb(
    @Body() cancelInvoiceSw: CancelInvoiceSwDto,
    @Res() res,
  ) {
    try {
      const results = await this.service.repo
        .createQueryBuilder('credit')
        .leftJoinAndSelect('credit.invoicesAcademy', 'invoicesAcademy')
        .select(['credit.id', 'credit.uuid', 'invoicesAcademy.id'])
        .where('credit.id = :id', {
          id: cancelInvoiceSw.invoiceId,
        })
        .getMany();

      if (typeof results === 'undefined' || results.length === 0) {
        throw new HttpException(
          'Not Found Invoice',
          HttpStatus.NOT_FOUND,
        );
      }

      const invoice = results[0];

      const currentBranch = await this.branchOffice.findBranch(
        cancelInvoiceSw.branchOfficeId,
      );

      const branchOfficeSett = await this.branchOfficeSettingService.findOne({
        where: {
          id: cancelInvoiceSw.branchOfficeSettingId,
        },
      });

      const cer = readFileSync(
        `${this.configService.getPath()}CSD/` + branchOfficeSett.cerCSD,
      ).toString('base64');
      const key = readFileSync(
        `${this.configService.getPath()}CSD/` + branchOfficeSett.keyCSD,
      ).toString('base64');

      const result = await this.smartWebService.cancelarCSD({
        rfc: branchOfficeSett.rfc,
        password: branchOfficeSett.password,
        uuid: invoice.uuid,
        cer,
        key,
        motivo: cancelInvoiceSw.motivo,
        folioSustitucion: cancelInvoiceSw.folioSustitucion,
      });

      const status = result.data.uuid[invoice.uuid.toUpperCase()];
      /** Nuevos estados para la venta:
       * 0.- Sin facturar
       * 1.- Facturado
       * 2.- Cancelado
       * 3.- En cola
       * 4.- Rechazado
       */
      
      if (
        status === '201' ||
        +status === 201 ||
        status === '202' ||
        +status === 202
      ) {
        
        await this._s3Service.putObjectCommand({
          type: 'application/xml',
          buffer: Buffer.from(result.data.acuse),
          key: `comprobantes/notas-credito/${invoice.uuid.toUpperCase()}-acuse.xml`,
        });

        if (cancelInvoiceSw.sendMail) {
          for (const email of cancelInvoiceSw.mails) {
            const sendMails = this.service.sendMailCancelacion(
              currentBranch,
              invoice.uuid,
              email,
              cancelInvoiceSw.subject,
              cancelInvoiceSw.body,
            );
          }
        }

        const objUpdate =  {
          status: 2,
          reasonCancellation: cancelInvoiceSw.reason,
          cancellationDate: new Date(),
          agentCanceling: {
            id: cancelInvoiceSw.cashierId,
          } as User,
        }

        const updateInvoice = await this.service.repo.update(
          { id: invoice.id }, objUpdate
         ,
        );
        

        res
          .send({
            msg: 'Cancelado',
            invoice: {
              ...invoice,
              ...objUpdate,
              invoicesAcademy: invoice.invoicesAcademy.map((i) => {
                return { id: i.id };
              }),
            },
          })
          .status(200);
      }
      if (status === '203' || +status === 203) {
        res
          .send({
            msg: 'Error',
            invoice: '',
          })
          .status(400);
      }
      if (status === '205' || +status === 205) {
        res
          .send({
            msg: 'Error',
            invoice: '',
          })
          .status(400);
      }
    } catch (e) {
      res.status(400).send(e);
    }
  }

}
