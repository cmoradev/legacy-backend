import { Controller, Delete, Param, ParseIntPipe, Put, Get, Res, Query } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyInscriptionConcepts } from './entities/academy-inscription-concepts.entity';
import { AcademyInscriptionConceptsService } from './academy-inscription-concepts.service';
import { IAcademyQueryReport, IAcademyQueryReportConcept } from './interfaces/IQueryReport';
import { ReportProcessor } from './reports/report.processor';
import { AcademyPaymentsReport } from './reports/AcademyPayments.report';
import { ConceptStatusExcel } from './reports/concept.status.excel';

@Crud({
  model: {
    type: AcademyInscriptionConcepts,
  },
  query: {
    filter: {
      deletedAt: {
        $eq: null,
      },
    },
    limit: 10,
    join: {
      acInsConActivity: { eager: false },
      acInsConConcepType: { eager: false },
      acInsConStatusPayment: { eager: false },
      acInscription: { eager: false },
      academyChargeDetail: { eager: false },
      extraCharges: { eager: false },
    },
  },
})
@Controller()
export class AcademyInscriptionConceptsController
  implements CrudController<AcademyInscriptionConcepts> {
  constructor(readonly service: AcademyInscriptionConceptsService) {}

  get base(): CrudController<AcademyInscriptionConcepts> {
    return this;
  }

  @Delete('soft-deleted/:id')
  public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.softDeleteOne(id);
  }

  @Put('soft-restore/:id')
  public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
    return await this.service.softRestoreOne(id);
  }

  // @Get('/fix')
  // async fixMonths(@Query() data: { key: string, save: boolean }, @Req() request, @Res() res: Response) {
  //     const newDate = [];
  //     const concepts = await this.service.repo.find({
  //         where: {
  //             idConceptoCobro: 2,
  //             keyInscription: data.key,
  //         },
  //     });
  //
  //     const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  //     let year = 2020;
  //     for (const concept of concepts) {
  //         const month = meses.indexOf(concept.description.split('-')[1].trim().toLowerCase()) + 1;
  //
  //         const format = month < 10 ? '0' + month.toString() : month;
  //         // newDate.push({
  //         //     id: concept.id,
  //         //     month: concept.description.split('-')[1].trim(),
  //         //     number: format,
  //         //     date: year + '-' + format + '-01',
  //         // });
  //         concept.payMonth = month;
  //         // @ts-ignore
  //         concept.payDate = year + '-' + format + '-01';
  //         if (data.save) {
  //             await this.service.repo.save(concept);
  //         } else {
  //         }
  //         if (concept.description.split('-')[1].trim() === 'diciembre') {
  //             year = 2021;
  //         }
  //     }
  //     res.send(concepts);
  // }

  @Get('report-by-status-payment')
  private async reportByStatusPayment(
    @Res() res,
    @Query() options: IAcademyQueryReport,
  ) {
    try {
      const response = await this.service.paymentsByStatus(options);
      if (options.isExported) {
        const report = new ReportProcessor().strutureReport(response);
        const workbook = new AcademyPaymentsReport().generateReport(
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
    @Query() options: IAcademyQueryReportConcept,
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
        name: `${new ReportProcessor().checkStatusPayment(
          parseInt(`${options.conceptStatus}`),
        )}s-${new Date().toTimeString()}`,
      };
      return res.send({ report, data });
    } else {
      return res.send({ report: false, data });
    }
  }
}
