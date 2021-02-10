import { Body, Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SchoolChargesInvoice } from './entities/school-charges-invoice.entity';
import { SchoolChargesInvoiceService } from './school-charges-invoice.service';
import { Response } from 'express';
import * as fs from 'fs';
import { readFileSync } from 'fs';
import { BranchOfficeSettingService } from '../../../system/branch-office-setting/branch-office-setting.service';
import { BranchOfficeService } from '../../../system/branch-office/branch-office.service';
import { FactSw } from '../../../webService/FactSw';
import { SchoolChargesPaymentsService } from '../school-charges-payments/school-charges-payments.service';
import { CancelInvoiceSwDto } from '../../../mini-store/store-sales/mini-store-invoices/dto/cancel.invoice.sw.dto';
import { User } from '../../../system/users/entities/user.entity';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';
import { ConfigService } from '../../../config/config.service';

@UseGuards(JwtGuard)
@Crud({
  model: {
    type: SchoolChargesInvoice,
  },
  query: {
    limit: 200,
    join: {
      schoolChargePayment: {},
      schoolCharge: {},
      agentBilling: {},
      agentCanceling: {},
    },
  },
})

@Controller()
export class SchoolChargesInvoiceController implements CrudController<SchoolChargesInvoice> {
  constructor(
    readonly service: SchoolChargesInvoiceService,
    readonly branchOfficeSettingService: BranchOfficeSettingService,
    readonly branchOffice: BranchOfficeService,
    readonly schoolChargePayment: SchoolChargesPaymentsService,
    private  smartWeb: FactSw,
    private readonly configService: ConfigService,
  ) {
  }

  get base(): CrudController<SchoolChargesInvoice> {
    return this;
  }

  @Get('/pdf')
  public async pdf(@Req() req, @Res() res: Response, @Query() query: { uuid: string }) {
    try {
      const pdf64 = readFileSync(`${this.configService.getPath()}comprobantes/colegio/` + query.uuid + '.pdf');
      // data:application/pdf;filename=generated.pdf;base64,
      res.send({ src: 'data:application/pdf;base64,' + pdf64.toString('base64') });
    } catch (e) {
      res.send({ error: e }).status(400);
    }
  }

  @Post('/send-invoice')
  async sendMail(@Body() data: {
    email: string;
    uuid: string;
    branchOfficeId: number;
    branchOfficeSettingId: number;
  }) {
    try {
      const currentBranch = await this.branchOffice.findBranch(data.branchOfficeId);
      const message = this.service.sendMail(currentBranch, data.uuid, data.email);
    } catch (e) {
      return e;
    }
  }

  @Post('cancel-invoice')
  async cancelInvoiceSwSmartWeb(@Body() cancelInvoiceSw: CancelInvoiceSwDto, @Res() res: Response) {
    try {
      const invoice = await this.service.findOne({
        where: {
          id: cancelInvoiceSw.invoiceId,
        },
        relations: ['schoolChargePayment'],
      });
      const currentBranch = await this.branchOffice.findBranch(cancelInvoiceSw.branchOfficeId);
      const branchOfficeSett = await this.branchOfficeSettingService.findOne({
        where: {
          id: cancelInvoiceSw.branchOfficeSettingId,
        },
      });
      const payment = await this.schoolChargePayment.findOne({
        where: {
          id: invoice.schoolChargePayment.id,
        },
      });
      const cer = fs.readFileSync(`${this.configService.getPath()}CSD/` + branchOfficeSett.cerCSD).toString('base64');
      // console.log(cer);
      const key = fs.readFileSync(`${this.configService.getPath()}CSD/` + branchOfficeSett.keyCSD).toString('base64');
      const responseSmartWeb = await this.smartWeb.cancelarCSD({
        rfc: branchOfficeSett.rfc,
        password: branchOfficeSett.password,
        uuid: invoice.uuid,
        cer,
        key,
      });
      const status = responseSmartWeb.data.uuid[invoice.uuid];
     //  console.log(responseSmartWeb);
      if (status === '201' || +status === 201 || status === '202' || +status === 202) {
        fs.writeFileSync(`${this.configService.getPath()}comprobantes/colegio/` + invoice.uuid + '-acuse.xml', responseSmartWeb.data.acuse);
        if (cancelInvoiceSw.sendMail) {
          for (const email of cancelInvoiceSw.mails) {
            const sendMails = this.service.sendMailCancelacion(currentBranch, invoice.uuid, email, cancelInvoiceSw.subject, cancelInvoiceSw.body);
          }
        }
        invoice.status = 2;
        invoice.reasonCancellation = cancelInvoiceSw.reason;
        invoice.cancellationDate = new Date();
        invoice.agentCanceling = {
          id: cancelInvoiceSw.cashierId,
        } as User;
        payment.stamping = 0;
        const updateInvoice = await this.service.updateInvoice(invoice);
        const updatePay = await this.schoolChargePayment.updatePayment(payment);
        res.send({
          msg: 'Cancelado',
          payment: updatePay,
          invoice: updateInvoice,
        }).status(200);
      }
    } catch (e) {
      res.send({
        msg: e,
        payment: '',
        invoice: '',
      }).status(400);
      console.log(e);
    }
  }

  @Get('report-invoices')
  async reportInvoices(@Res()response, @Query() query: {
    startDate: string,
    endDate: string,
    billingAgent: number,
    status: number,
    data: string,
  }) {
    try {
      const dataReport = await this.service.reportInvoices(query);
      response.status(200);
      response.send(dataReport);
    } catch (e) {
      response.status(401);
      response.send(e.message);
    }
  }
}
