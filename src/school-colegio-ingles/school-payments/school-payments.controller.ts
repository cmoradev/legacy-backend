import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SchoolPayment } from './entities/school-payment.entity';
import { SchoolPaymentsService } from './school-payments.service';
import { IQueryReport, IQueryReportConcept } from './interfaces/IQueryReport';
import { ReportProcessor } from './report/report.processor';
import { SchoolPaymentsReport } from './report/schoolPayments.report';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';
import { Response } from 'express';
import { ConceptStatusExcel } from './report/concept.status.excel';
import { getNameStatusConcept } from './report/helpers';

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
  constructor(readonly service: SchoolPaymentsService) {}

  get base(): CrudController<SchoolPayment> {
    return this;
  }

  @Get('/add/payments')
  public async addSchoolPayment(@Req() req, @Res() res: Response) {
    try {
      res.send({ save: 'data' });
    } catch (e) {
      res.send(e);
    }
  }

  @Get('report-by-status-payment')
  private async reportByStatusPayment(
    @Res() res,
    @Query() options: IQueryReport,
  ) {
    try {
      const response = await this.service.paymentsByStatus(options);
      if (options.isExported) {
        const report = new ReportProcessor().strutureReport(response);
        const workbook = new SchoolPaymentsReport().generateReport(
          report,
          options,
        );
        const dateName = new Date();
        const fileName = dateName.toTimeString() + '.xlsx';
        const result = await workbook.xlsx.writeBuffer({ filename: fileName });
        const buffer = Buffer.from(result);
        const b64Encoding =
          'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
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

  @Get('report-concepts-today')
  private async reportConceptsUpToDate(
    @Res() res,
    @Query() options: IQueryReportConcept,
  ) {
    const data = await this.service.reportConceptsUpToDate(options);

    if (options?.isExported) {
      const conceptStatusExcel = new ConceptStatusExcel(options, data);
      const buffer = await conceptStatusExcel.getWorkBook().xlsx.writeBuffer({
        filename: `${new Date().toTimeString()}.xlsx`,
      });
      const report = {
        src: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Buffer.from(
          buffer,
        ).toString('base64')}`,
        type: 'excel',
        name: `${getNameStatusConcept(
          parseInt(`${options.conceptStatus}`),
        )}s-${new Date().toTimeString()}`,
      };
      return res.send({ report, data });
    } else {
      return res.send({ report: false, data });
    }
  }
}
