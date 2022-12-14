import {Controller, Delete, Param, ParseIntPipe, Put, Query, Res, Get} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyChargeDetails } from './entities/academy-charge-details.entity';
import { AcademyChargeDetailsService } from './academy-charge-details.service';
import {IQueryReportSaleTodayOp} from '../../../mini-store/store-sales/mini-store-sales/types/IReport';
import {NotInvoiced, PaymentExtraCharge} from '../../../common/interface/not-invoiced.interface';
import {getNameReport} from '../../../mini-store/store-sales/mini-store-sales/reports/helpers';
import { dataFullSale, PaymentExcel, reportPaymentByClient } from 'src/common/utils/report';
import { InvoiceModules } from 'src/common/point-of-sale/types.pos';

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
        let data: PaymentExtraCharge[] = dataFullSale(result, InvoiceModules.ACADEMY)
        let dataByClient = [];

        if (options.byClient) {
            dataByClient = reportPaymentByClient(data);
        }

        if (options?.isExported) {
            const conceptStatusExcel = new PaymentExcel(options, options.byClient ? dataByClient : data, [], InvoiceModules.ACADEMY, 'Ventas');
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
