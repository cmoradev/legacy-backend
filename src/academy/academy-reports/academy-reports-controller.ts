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
import { AcademyBankStatementQuery, AcademyIncomeQuery } from './dto';
import { AcademyBankStatementService } from './academy-bank-statement-service';

@Controller()
export class AcademyReportsController {
  private readonly logger = new Logger(AcademyReportsController.name);

  constructor(
    private readonly academyIncomeService: AcademyIncomeService,
    private readonly academyBankStatementService: AcademyBankStatementService
  ) {}

  @Public()
  @UsePipes(ValidationPipe)
  @Get('/academy-income-report')
  async academyIncomeReport(@Query() query: AcademyIncomeQuery) {
    try {
      const {
        rows,
        matriz,
      } = await this.academyIncomeService.academyIncomeData(query);

      const document = await this.academyIncomeService.academyIncomeDocument(
        rows,
        matriz,
      );

      const filename = 'Reporte_Ingresos_Academia';

      const base64 = await document.getBase64(filename);

      return {
        data: { rows, matriz },
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
}
