import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreWarehouseOrder } from './entities/mini-store-warehouse-order.entity';
import { MiniStoreWarehouseOrdersService } from './mini-store-warehouse-orders.service';
import { orderRecipe } from './reports/ordersRecipe';
import { add, mul, round } from 'exact-math';
import { BranchOfficeSettingService } from '../../system/branch-office-setting/branch-office-setting.service';
import { BranchOfficeService } from '../../system/branch-office/branch-office.service';
import { ivaFromFinalAmount } from '../../common/numbers';
import * as moment from 'moment';
import { TableCell } from 'pdfmake/interfaces';
import { MailService, MAIL_TEMPLATES } from '../../common/mail';
import { pdfMailDto } from './dto/pdfMail.dto';

@Crud({
    model: {
        type: MiniStoreWarehouseOrder,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        limit: 10,
        join: {
            miniStoreWareHouseOrdersProducts: {eager: false},
            'miniStoreWareHouseOrdersProducts.miniStoreProduct': {eager: false},
            miniStoreWarehouseProvider: {eager: false},
            branchOfficeMiniStoreWherehouse: {eager: false},
        },
    },
})

@Controller()
export class MiniStoreWarehouseOrdersController implements CrudController<MiniStoreWarehouseOrder> {
    constructor(
        readonly service: MiniStoreWarehouseOrdersService,
        readonly serviceInvoiceCompany: BranchOfficeSettingService,
        readonly branchOfficeService: BranchOfficeService,
        private readonly mailService: MailService,
    ) {
    }

    get base(): CrudController<MiniStoreWarehouseOrder> {
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

    @Get('pdf/:id')
    public async pdf(@Param('id') id, @Res() res: Response) {
        const body: TableCell[][] = [];
        const order = await this.service.getOrdersWeareHouse(id);
        let i = 1;
        let total = 0;
        for (const product of order.miniStoreWareHouseOrdersProducts) {
            const prod: TableCell[] = [];

            const totalProd = round(mul(product.requestedAmount, product.providerPriceReceived), -2, {
                returnString: true,
                trim: false,
            });
            prod.push({ text: i.toString(), alignment: 'center' });
            prod.push({ text: product.miniStoreProduct.name, alignment: 'left' });
            prod.push({ text: product.requestedAmount.toString() });
            prod.push({ text: product.miniStoreProduct.unity });
            prod.push({ text: product.receivedAmount.toString() });
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
            orderDate: moment(order.orderDate).format('DD/MM/YYYY'),
            arrivalDate: moment(order.expectedDate).format('DD/MM/YYYY'),
            requestedItems: body.length,
            folio: order.folio,
            body,
            total,
            impuesto: ivaFromFinalAmount(total).iva,
            subtotal: ivaFromFinalAmount(total).amountWithOutIva,
        });

        // Buffer.from(data, 'base64');
        res.send({ src: 'data:application/pdf;filename=generated.pdf;base64,' + bufferPdf });
        // res.send({ src: 'data:application/pdf;filename=generated.pdf;base64,' + bufferPdf.toString('base64') });
        // res.end(, 'binary');
        // res.send(body);
        // res.setHeader('Content-Disposition', 'attachment; filename="' + encodeURIComponent(pdfBuffer.toString()) + '"');
    }

    @Post('pdf/:id')
    public async sendpdf(@Param() params, @Res() res: Response, @Body() requestData: pdfMailDto) {
        const body: TableCell[][] = [];
        const order = await this.service.getOrdersWeareHouse(params.id);
        let i = 1;
        let total = 0;
        for (const product of order.miniStoreWareHouseOrdersProducts) {
            const prod: TableCell[] = [];

            const totalProd = round(mul(product.requestedAmount, product.providerPriceReceived), -2, {
                returnString: true,
                trim: false,
            });
            prod.push({ text: i.toString(), alignment: 'center' });
            prod.push({ text: product.miniStoreProduct.name, alignment: 'left' });
            prod.push({ text: product.requestedAmount.toString() });
            prod.push({ text: product.miniStoreProduct.unity });
            prod.push({ text: product.receivedAmount.toString() });
            prod.push({ text: round(product.providerPriceReceived, -2, { returnString: true, trim: false }) });
            prod.push({ text: totalProd });
            body.push(prod);
            i += 1;
            total = add(total, totalProd);
        }
        const company = await this.serviceInvoiceCompany.findCompany(3);
        const bufferPdf = await orderRecipe({
            business: company.businessName,
            provider: order.miniStoreWarehouseProvider.business,
            applicant: order.agentCreator?.name ?? 'No asignado',
            orderDate: moment(order.orderDate).format('DD/MM/YYYY'),
            arrivalDate: moment(order.expectedDate).format('DD/MM/YYYY'),
            requestedItems: body.length,
            folio: order.folio,
            body,
            total,
            impuesto: ivaFromFinalAmount(total).iva,
            subtotal: ivaFromFinalAmount(total).amountWithOutIva,
        });

        const fileName = `orden-pedido-${order.folio}.pdf`;

        const sent = await this.mailService.sendEmail({
            to: requestData.mail,
            subject: 'Orden de Pedido',
            template: MAIL_TEMPLATES.WAREHOUSE_ORDER,
            context: {
                description:
                    'Por este medio adjuntamos la orden de pedido. Saludos.',
            },
            attachments: [
                {
                    filename: fileName,
                    contentType: 'application/pdf',
                    content: Buffer.from(bufferPdf, 'base64'),
                },
            ],
        });

        res.send({
            response: sent.published,
            emailSent: sent.published,
            error: sent.error ? sent.error.message : null,
        });
    }

    public unitProd(unitMeasurement: number) {
        switch (unitMeasurement) {
            case 1:
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
