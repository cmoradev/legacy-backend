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
import { AcademyIncomeQuery } from './dto';

@Controller()
export class AcademyReportsController {
  private readonly logger = new Logger(AcademyReportsController.name);

  constructor(private readonly academyIncomeService: AcademyIncomeService) {}

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
}
