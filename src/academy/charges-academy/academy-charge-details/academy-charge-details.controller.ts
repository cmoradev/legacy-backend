import {Controller, Delete, Param, ParseIntPipe, Put, Query, Res, Get} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyChargeDetails } from './entities/academy-charge-details.entity';
import { AcademyChargeDetailsService } from './academy-charge-details.service';
import {IQueryReportSaleTodayOp} from '../../../mini-store/store-sales/mini-store-sales/types/IReport';
import {NotInvoiced} from '../../../common/interface/not-invoiced.interface';
import {getDataCharges} from '../../../school-colegio-ingles/charges-school/school-charges-payments/reports/payments.util';
import {InvoiceModules} from '../../../common/point-of-sale/types.pos';
import {reportAcademiaSaleByClient} from './utils/utils';
import {AcademiaSalesExcel} from './reports/academia-sales.excel';
import {getNameReport} from '../../../mini-store/store-sales/mini-store-sales/reports/helpers';

@Crud({
    model: {
        type: AcademyChargeDetails,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        limit: 10,
        join: {},
    },
})
@Controller()
export class AcademyChargeDetailsController implements CrudController<AcademyChargeDetails> {
    constructor(
        readonly service: AcademyChargeDetailsService,
    ) {
    }

    get base(): CrudController<AcademyChargeDetails> {
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

    @Get('report-sale-academia')
    private async reportSaleAcademia(
        @Res() res,
        @Query() options: IQueryReportSaleTodayOp,
    ) {
        const result = await this.service.reportSaleAcademia(options);
        let data: NotInvoiced[] = getDataCharges(result, InvoiceModules.ACADEMY, true)
        let dataByClient: NotInvoiced[] = [];

        if (options.byClient) {
            dataByClient = reportAcademiaSaleByClient(data);
        }

        if (options?.isExported) {
            const conceptStatusExcel = new AcademiaSalesExcel(options, options.byClient ? dataByClient : data);
            const buffer = await conceptStatusExcel.getWorkBook().xlsx.writeBuffer({
                filename: `${getNameReport(options.byClient ? 'Ventas_por_cliente' : 'Ventas', options).excel}.xlsx`,
            });
            const report = {
                src: `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${Buffer.from(
                    buffer,
                ).toString('base64')}`,
                type: 'excel',
                name: `${getNameReport(options.byClient ? 'Ventas_por_cliente' : 'Ventas', options).excel}`,
            };
            return res.send({ report, data: options.byClient ? dataByClient : data });
        } else {
            return res.send({ report: false, data: options.byClient ? dataByClient : data });
        }
    }
}
