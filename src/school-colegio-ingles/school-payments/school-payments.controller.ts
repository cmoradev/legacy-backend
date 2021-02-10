import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SchoolPayment } from './entities/school-payment.entity';
import { SchoolPaymentsService } from './school-payments.service';
import { IQueryReport } from './interfaces/IQueryReport';
import { ReportProcessor } from './report/report.processor';
import { SchoolPaymentsReport } from './report/schoolPayments.report';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';
@UseGuards(JwtGuard)
@Crud({
  model: {
    type: SchoolPayment,
  },
  query: {
    join: {
      schoolChargeDetail: {},
      'schoolChargeDetail.extraCharges': {},
      inscription: {},
      extraCharges: { alias: 'schoolExtraCharges' },
      paymentPlanConcept: {},
      'paymentPlanConcept.paymentPlan': {},
    },
  },
})
@Controller()
export class SchoolPaymentsController implements CrudController<SchoolPayment> {
  constructor(
    readonly service: SchoolPaymentsService,
  ) {
  }

  get base(): CrudController<SchoolPayment> {
    return this;
  }

  @Get('report-by-status-payment')
  private async reportByStatusPayment(@Res() res, @Query() options: IQueryReport) {
    try {
      const response = await this.service.paymentsByStatus(options);
      if (options.isExported) {
        const report = new ReportProcessor().strutureReport(response);
        const workbook = new SchoolPaymentsReport().generateReport(report, options);
        const dateName = new Date();
        const fileName = dateName.toTimeString() + '.xlsx';
        const result = await workbook.xlsx.writeBuffer({ filename: fileName });
        const buffer = Buffer.from(result);
        const b64Encoding = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
        res.send({
          src: b64Encoding + buffer.toString('base64'),
          type: 'excel',
          name: 'monthly-payments',
        });
      } else {
        res.status(200).send(response);
      }
    } catch (e) {
      res.status(404).send(e.message);
    }
  }
}
