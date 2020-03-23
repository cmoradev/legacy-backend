import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { CrudController, Crud } from '@nestjsx/crud';
import { MiniStoreWarehouseOrder } from './entities/mini-store-warehouse-order.entity';
import { MiniStoreWarehouseOrdersService } from './mini-store-warehouse-orders.service';
import { orderRecipe } from './reports/ordersRecipe';
import { TableRowsDocx } from '../../common/office/docx/Table.docx';
import { AlignmentType } from 'docx';
import { add, mul, round } from 'exact-math';
import { InvoiceCompanyService } from '../../invoice/invoice-company/invoice-company.service';
import { ivaFromFinalAmount } from '../../common/numbers';

@Crud({
    model: {
        type: MiniStoreWarehouseOrder,
    },
    query: {
        join: {
            miniStoreWareHouseOrdersProducts: {},
            'miniStoreWareHouseOrdersProducts.miniStoreProduct': {},
            miniStoreWarehouseProvider: {},
        },
    },
})
@Controller()
export class MiniStoreWarehouseOrdersController implements CrudController<MiniStoreWarehouseOrder> {
    constructor(
        readonly service: MiniStoreWarehouseOrdersService,
        readonly serviceInvoiceCompany: InvoiceCompanyService,
    ) {
    }

    get base(): CrudController<MiniStoreWarehouseOrder> {
        return this;
    }

    @Get('pdf/:id')
    public async pdf(@Param() params, @Res() res: Response) {
        const body: TableRowsDocx[][] = [];
        const order = await this.service.getOrdersWeareHouse(params.id);
        let i = 1;
        let total = 0;
        for (const product of order.miniStoreWareHouseOrdersProducts) {
            const prod: TableRowsDocx[] = [];

            const totalProd = round(mul(product.requestedAmount, product.providerPriceReceived), -2, {
                returnString: true,
                trim: false,
            });
            prod.push({ text: i, align: AlignmentType.CENTER });
            prod.push({ text: product.miniStoreProduct.name, align: AlignmentType.LEFT });
            prod.push({ text: product.requestedAmount });
            prod.push({ text: this.unitProd(product.miniStoreProduct.unitMeasurement).name });
            prod.push({ text: product.receivedAmount });
            prod.push({ text: round(product.providerPriceReceived, -2, { returnString: true, trim: false }) });
            prod.push({ text: totalProd });
            body.push(prod);
            i += 1;
            total = add(total, totalProd);
        }
        const company = await this.serviceInvoiceCompany.findCompany(3);
        // res.contentType('application/pdf');
        // res.setHeader('Content-Type', 'application/pdf');
        // toBase64String
        const bufferPdf = await orderRecipe({
            business: company.businessName,
            provider: order.miniStoreWarehouseProvider.business,
            applicant: order.agentCreator?.name ?? 'No asignado',
            orderDate: order.orderDate,
            arrivalDate: order.expectedDate,
            requestedItems: body.length,
            folio: order.folio,
            body,
            total,
            impuesto: ivaFromFinalAmount(total).iva,
            subtotal: ivaFromFinalAmount(total).amountWithOutIva,
        });
        res.send({ src: 'data:application/pdf;filename=generated.pdf;base64,' + bufferPdf.toString('base64') });
        // res.end(, 'binary');
        // res.send(body);
        // res.setHeader('Content-Disposition', 'attachment; filename="' + encodeURIComponent(pdfBuffer.toString()) + '"');
    }

    public unitProd(unitMeasurement: number) {
        switch (unitMeasurement) {
            case 1 :
                return { name: 'Kilogramos', measurement: 'kg(s)' };
                break;
            case 6:
                return { name: 'Pieza', measurement: 'pza(s)' };
                break;
            case 8:
                return { name: 'Litros', measurement: 'Lts' };
                break;
            default:
                return { name: 'unknow', measurement: '' };
        }
    }
}
