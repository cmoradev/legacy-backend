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
import { AcademyIncomeQuery, IncomeQuery, InvoiceQuery } from './dto';
import { IncomeService } from './income-service';
import { InvoiceService } from './invoice-service';

@Controller()
export class AcademyReportsController {
  private readonly logger = new Logger(AcademyReportsController.name);

  constructor(
    private readonly academyIncomeService: AcademyIncomeService,
    private readonly incomeService: IncomeService,
    private readonly invoiceService: InvoiceService,
  ) {}

  @Public()
  @UsePipes(ValidationPipe)
  @Get('/academy-income-report')
  async academyIncomeReport(@Query() query: AcademyIncomeQuery) {
    try {
      const {
        rows,
        academies,
      } = await this.academyIncomeService.academyIncomeData(query);

      const document = await this.academyIncomeService.academyIncomeDocument(
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
      const { rows, summary } = await this.incomeService.incomeData(query);

      const document = await this.incomeService.academyIncomeDocument(
        rows,
        summary,
      );

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
      const { rows, summary } = await this.invoiceService.incomeData(query);

      const document = await this.invoiceService.academyIncomeDocument(
        rows,
        summary,
      );

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
}
