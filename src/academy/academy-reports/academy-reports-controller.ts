import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AcademyIncomeService } from './academy-income-service';
import { Public } from 'src/common/docorators/public.decorator';
import { IncomeService } from './income-service';
import { InvoiceService } from './invoice-service';
import { GroupService } from './group-service';
import {
  AcademyBankStatementQuery,
  AcademyIncomeQuery,
  GroupQuery,
  IncomeQuery,
  InvoiceQuery,
} from './dto';
import { AcademyBankStatementService } from './academy-bank-statement-service';
import { AcademyDebitService } from './academy-debit-service';
import { AcademyDebitQuery } from './dto/academy-debit-query';

@Controller()
export class AcademyReportsController {
  private readonly logger = new Logger(AcademyReportsController.name);

  constructor(
    private readonly academyIncomeService: AcademyIncomeService,
    private readonly academyBankStatementService: AcademyBankStatementService,
    private readonly incomeService: IncomeService,
    private readonly invoiceService: InvoiceService,
    private readonly groupService: GroupService,
    private readonly debitService: AcademyDebitService
  ) {}

  @Public()
  @UsePipes(ValidationPipe)
  @Get('/academy-income-report')
  async academyIncomeReport(@Query() query: AcademyIncomeQuery) {
    try {
      const { rows, academies } = await this.academyIncomeService.getData(
        query,
      );

      const document = await this.academyIncomeService.buildDocument(
        rows,
        academies,
      );

      const filename = 'Reporte_Ingresos_Academia';

      const base64 = await document.getBase64(filename);

      return {
        data: { rows, academies },
        report: {
          filename,
          base64,
        },
      };
    } catch (e) {
      this.logger.error('Error generating academy income report');
      console.error(e);
      throw new BadRequestException(
        'Error al generar el reporte de ingresos por academia',
      );
    }
  }

  @Public()
  @UsePipes(ValidationPipe)
  @Get('/income-report')
  async incomeReport(@Query() query: IncomeQuery) {
    try {
      const { rows, summary } = await this.incomeService.getData(query);

      const document = await this.incomeService.buildDocument(rows, summary);

      const filename = 'Reporte_Ingresos';

      const base64 = await document.getBase64(filename);

      return {
        data: { rows, summary },
        report: {
          filename,
          base64,
        },
      };
    } catch (e) {
      this.logger.error('Error generating income report');
      console.error(e);
      throw new BadRequestException('Error al generar el reporte de ingresos');
    }
  }

  @Public()
  @UsePipes(ValidationPipe)
  @Get('/invoices-report')
  async invoicesReport(@Query() query: InvoiceQuery) {
    try {
      const { rows, summary } = await this.invoiceService.getData(query);

      const document = await this.invoiceService.buildDocument(rows, summary);

      const filename = 'Reporte_Facturas';

      const base64 = await document.getBase64(filename);

      return {
        data: { rows, summary },
        report: {
          filename,
          base64,
        },
      };
    } catch (e) {
      this.logger.error('Error generating invoice report');
      console.error(e);
      throw new BadRequestException('Error al generar el reporte de facturas');
    }
  }

  @Public()
  @UsePipes(ValidationPipe)
  @Get('/group-report')
  async groupReport(@Query() query: GroupQuery) {
    try {
      const { groups } = await this.groupService.getData(query);

      const document = await this.groupService.buildDocument(groups, query);

      const filename = 'Reporte_Grupos';

      const base64 = await document.getBase64(filename);

      return {
        data: { groups },
        report: {
          filename,
          base64,
        },
      };
    } catch (e) {
      console.error(e);
      this.logger.error('Error generating list of groups report');
      throw new BadRequestException(
        'Error al generar las listas de asistencia',
      );
    }
  }

  @Public()
  @UsePipes(ValidationPipe)
  @Get('/academy-bank-statement-report')
  async academyBankStatementReport(@Query() query: AcademyBankStatementQuery) {
    try {
      return await this.academyBankStatementService.academyBankStatement(query);
    } catch (e) {
      this.logger.error('Error generating academy bank statement report');
      console.error(e);
      throw new BadRequestException(
        `Error al generar el reporte de estado de cuenta de ${query.studentId} en rango de fechas (${query.startDate}-${query.endDate}) por academia`,
      );
    }
  }

  @Public()
  @UsePipes(ValidationPipe)
  @Get('/academy-debit-report')
  async academyDebitReport(@Query() query: AcademyDebitQuery){
    try {
      const data = await this.debitService.academyDebit(query);

      const document = await this.debitService.buildDocument(data.matriz, data.rows.dataWithMonth);

      const filename = 'Reporte_Academias_Adeudos';

      const base64 = await document.getBase64(filename);

      return {
        data,
        report: {
          filename,
          base64,
        },
      };
    } catch (e) {
      console.error(e);
      this.logger.error('Error generating academy debit report');
      throw new BadRequestException(
        'Error al generar los adeudos de academias',
      );
    }
  }
}
