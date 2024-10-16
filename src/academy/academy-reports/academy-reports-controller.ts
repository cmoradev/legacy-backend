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
import {
  AcademyIncomeQuery,
  GroupQuery,
  IncomeQuery,
  InvoiceQuery,
} from './dto';
import { IncomeService } from './income-service';
import { InvoiceService } from './invoice-service';
import { GroupService } from './group-service';

@Controller()
export class AcademyReportsController {
  private readonly logger = new Logger(AcademyReportsController.name);

  constructor(
    private readonly academyIncomeService: AcademyIncomeService,
    private readonly incomeService: IncomeService,
    private readonly invoiceService: InvoiceService,
    private readonly groupService: GroupService,
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
}
