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
import { MiniStoreIncomeService } from './mini-store-income-service';
import { MiniStoreIncomeQuery, MiniStoreInvoiceQuery } from './dto';
import { MiniStoreInvoiceService } from './mini-store-invoice-service';


@Controller()
export class MiniStoreReportsController {
  private readonly logger = new Logger(MiniStoreReportsController.name);

  constructor(
    private readonly miniStoreIncomeService: MiniStoreIncomeService,
    private readonly invoiceService: MiniStoreInvoiceService,
  ) {}

  @Public()
  @UsePipes(ValidationPipe)
  @Get('/mini-store-income-report')
  async incomeReport(@Query() query: MiniStoreIncomeQuery) {
    try {
      const { rows, summary } = await this.miniStoreIncomeService.getData(query);

      const document = await this.miniStoreIncomeService.buildDocument(rows, summary);

      const filename = 'Reporte_Ingresos_Tienda';

      const base64 = await document.getBase64(filename);

      const documentLite = await this.miniStoreIncomeService.buildDocumentLite(rows, summary);

      const filenameLite = 'Reporte_Ingresos_Tienda';

      const base64Lite = await documentLite.getBase64(filenameLite);

      return {
        data: { rows, summary },
        report: {
          filename,
          base64,
        },
        reportLite: {
          filename: filenameLite,
          base64: base64Lite,
        }
      };
    } catch (e) {
      this.logger.error('Error generating mini store: income report');
      console.error(e);
      throw new BadRequestException('Error al generar el reporte de ingresos de tienda');
    }
  }

  @Public()
  @UsePipes(ValidationPipe)
  @Get('/mini-store-invoices-report')
  async invoicesReport(@Query() query: MiniStoreInvoiceQuery) {
    try {
      const { rows, summary } = await this.invoiceService.getData(query);

      const document = await this.invoiceService.buildDocument(rows, summary);

      const filename = 'Reporte_Facturas_Tienda';

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
