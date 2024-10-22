import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Public } from 'src/common/docorators/public.decorator';
import { SchoolIncomeService } from './school-income-service';
import { SchoolIncomeQuery, SchoolInvoiceQuery } from './dto';
import { SchoolInvoiceService } from './school-invoice-service';

@Controller()
export class SchoolReportsController {
  private readonly logger = new Logger(SchoolReportsController.name);

  constructor(
    private readonly incomeService: SchoolIncomeService,
    private readonly invoiceService: SchoolInvoiceService
  ) {}


  @Public()
  @UsePipes(ValidationPipe)
  @Get('/school-income-report')
  async incomeReport(@Query() query: SchoolIncomeQuery) {
    try {
      const { rows, summary } = await this.incomeService.getData(query);

      const document = await this.incomeService.buildDocument(rows, summary);

      const filename = 'Reporte_Ingresos_Colegio';

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
  @Get('/school-invoices-report')
  async invoicesReport(@Query() query: SchoolInvoiceQuery) {
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

}
