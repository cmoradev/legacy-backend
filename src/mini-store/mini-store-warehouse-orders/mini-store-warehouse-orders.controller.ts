import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { Crud, CrudController } from '@nestjsx/crud';
import { MiniStoreWarehouseOrder } from './entities/mini-store-warehouse-order.entity';
import { MiniStoreWarehouseOrdersService } from './mini-store-warehouse-orders.service';
import { orderRecipe } from './reports/ordersRecipe';
import { AlignmentType } from 'docx';
import { add, mul, round } from 'exact-math';
import { BranchOfficeSettingService } from '../../system/branch-office-setting/branch-office-setting.service';
import { BranchOfficeService } from '../../system/branch-office/branch-office.service';
import { ivaFromFinalAmount } from '../../common/numbers';
import * as moment from 'moment';
import { TableCell } from 'pdfmake/interfaces';
import * as fs from 'fs';
import * as nodemailer from 'nodemailer';
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
            prod.push({ text: i.toString(), align: AlignmentType.CENTER });
            prod.push({ text: product.miniStoreProduct.name, align: AlignmentType.LEFT });
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
            prod.push({ text: i.toString(), align: AlignmentType.CENTER });
            prod.push({ text: product.miniStoreProduct.name, align: AlignmentType.LEFT });
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

        const dir = '/tmp';
        const tempName = Math.random().toString(36).substring(7) + '.pdf';

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            fs.writeFileSync(`${dir}/${tempName}`, bufferPdf, { encoding: 'base64' });
        } else {
            fs.writeFileSync(`${dir}/${tempName}`, bufferPdf, { encoding: 'base64' });
        }

        const currentBranch = await this.branchOfficeService.findBranch(requestData.currentBranch);
        const emailResponse = await this.sendOrderPdf({
            emisorMail: `smtps://${currentBranch.Email}:${currentBranch.EmailPass}@smtp.gmail.com`,
            fileName: tempName,
            receptorEmail: requestData.mail,
        });

        try {
            fs.unlinkSync(`${dir}/${tempName}`);
        } catch (err) {
            // handle the error
        }

        if (emailResponse && emailResponse.accepted && emailResponse.accepted.length > 0) {
            res.send({ response: true });
        } else {
            res.send({ response: false });
        }
    }

    public async sendOrderPdf(options: { emisorMail: string, fileName: string, receptorEmail: string }) {

        const { emisorMail, fileName, receptorEmail } = options;

        const transporter = nodemailer.createTransport(emisorMail);
        const mailOptions = {
            transporterName: emisorMail,
            to: receptorEmail,
            from: 'developers@colegioinglesplaya.com',
            subject: 'Orden de Pedido',
            text: 'PDF con la orden de pedido',
            html: '<div> Por este medio adjuntamos la orden de pedido. Saludos. </div>',
            attachments: [
                {
                    filename: `${fileName}`,
                    path: `/tmp/${fileName}`,
                },
            ],
        };

        return await transporter.sendMail(mailOptions);

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
