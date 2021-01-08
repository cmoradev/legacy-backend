import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreQuotation } from './entities/mini-store-quotation.entity';
import { MiniStoreQuotationService } from './mini-store-quotation.service';
import { JwtGuard } from '../../../system/auth/guards/jwt.guard';
import { Response } from 'express';
import { QuoationsReport } from './reports/quoations.report';

// @UseGuards(JwtGuard)
@Controller('reports')
export class MiniStoreQuotationReporteController {
    constructor(
      readonly service: MiniStoreQuotationService,
    ) {
    }

    @Get('quotation')
    async index(@Req() request, @Res() res: Response, @Query() query: {
        status: number;
        startDate: Date;
        endDate: Date;
        cashier?: number;
        onlyFile: boolean;
        branchOfficeId: number;
    }) {
        const quotation = await this.service.report();
        const result = {
            quotation: [],
            file: '',
        };
        if (query.onlyFile) {
            result.file = await new QuoationsReport().generate(quotation);
        } else {
            result.quotation = quotation;
        }
        res.send(result);
    }
}
