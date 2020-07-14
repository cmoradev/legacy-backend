import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreInvoice } from './entities/mini-store-invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { MiniStoreSalesPaymentsService } from '../mini-store-sales-payments/mini-store-sales-payments.service';
import * as MomentTimeZone from 'moment-timezone';
import * as Moment from 'moment';
import { ChangeStatusInvoiceMiniStoreInterface } from './interface/ChangeStatusInvoiceMiniStore.interface';
import { UsersService } from '../../../system/users/users.service';
import { InvoiceMethodPayment } from '../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import { InvoiceProcessor } from './processor/invoice.processor';
import { ReportInvoice } from './reports/invoice.report';
import { InvoiceReport } from '../mini-store-sales-payments/interface/InvoiceMiniStore.interface';
import { BranchOfficeSettingService } from '../../../system/branch-office-setting/branch-office-setting.service';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { StatusInvoce } from '../../../invoice/interface/StatusInvoce.interface';

@Injectable()
export class MiniStoreInvoicesService extends TypeOrmCrudService<MiniStoreInvoice> {
    constructor(
        @InjectRepository(MiniStoreInvoice, ColegioDBNameConnection) readonly repo: Repository<MiniStoreInvoice>,
        readonly salesPaymentService: MiniStoreSalesPaymentsService,
        readonly userService: UsersService,
        readonly serviceInvoiceCompany: BranchOfficeSettingService,
    ) {
        super(repo);
    }

    async updateInvoice(data: MiniStoreInvoice) {
        let invoice = await this.repo.findOne({ id: data.id });
        invoice = { ...data };
        return await this.repo.save(invoice);
    }

    async changeStautsInvoice(data: ChangeStatusInvoiceMiniStoreInterface) {
        const fecha = MomentTimeZone().tz('America/Mexico_City').format('YYYY-MM-DDThh:mm:ss');
        const invoice = await this.repo.findOne({ id: data.id });
        invoice.status = data.status;
        invoice.idCancelingAgent = data.idCancelingAgent;
        invoice.agentCanceling = await this.userService.findOne({ id: data.idCancelingAgent });
        invoice.reasonCancellation = data.reasonCancellation;
        // @ts-ignore
        invoice.cancellationDate = fecha;
        return await this.repo.save(invoice);
    }

    async changeStautsInvoiceC(id: number, status: number) {
        const invoice = await this.repo.findOne({ id });
        invoice.status = status;
        return await this.repo.save(invoice);
    }

    async changeStautsPayment(id: number, status: number) {
        const payment = await this.salesPaymentService.findOne({ id });
        payment.stamping = status;
        return await this.salesPaymentService.repo.save(payment);
    }

    async saveInvoice(data: MiniStoreInvoice) {
        const invoice = await this.repo.create(data);
        const result = await this.repo.save(invoice);
        return await this.repo.findOne({ id: result.id });
    }

    async findInvoiceByPayment(options: { paymentId: number, status: StatusInvoce, stamping?: number }) {
        const invoice = this.repo.createQueryBuilder('invoice')
            .leftJoinAndSelect('invoice.miniStoreSalePayment', 'miniStoreSalePayment')
            .where('invoice.status = :status', {
                status: options.status,
            })
            .where('miniStoreSalePayment.id= :paymentId', {
                paymentId: options.paymentId,
            });
        if (options.stamping) {
            invoice.andWhere('miniStoreSalePayment.stamping= :stamping', {
                stamping: options.stamping,
            });
        }

        return await invoice.getOne();
    }

    async reportInvoice(query: {
        startDate: string,
        endDate: string,
        billingAgent: number,
        status: number,
        data: string,
    }): Promise<string | InvoiceReport[] | any> {
        const invoices = await this.repo.find({
            where: {
                status: query.status,
                createdAt: Between(
                    Moment(query.startDate).startOf('day').toDate(),
                    Moment(query.endDate).endOf('day').toDate()),
            },
            relations: [
                'agentBilling',
                'agentCanceling',
                'miniStoreSalePayment',
                'miniStoreSalePayment.miniStoreSaleMethodPayments',
                'miniStoreSalePayment.miniStoreSaleMethodPayments.invoiceMethod',
                'miniStoreSale',
                'miniStoreSale.student',
                'saleReturn',
                'saleReturn.agent',
                'saleReturn.paymentMethod',
            ],
        });
        const report = new InvoiceProcessor().structureInvoiceReport(invoices);
        switch (query.data) {
            case 'data':
                return report;
                break;
            case 'file':
                const company = await this.serviceInvoiceCompany.findCompany(3);
                const workbook = new ReportInvoice().generateReport(report, query, company);
                const dateName = new Date();
                const fileName = dateName.toTimeString() + '.xlsx';
                const result = await workbook.xlsx.writeBuffer({ filename: fileName });
                // await workbook.xlsx.writeFile('./xls-imports/' + fileName);
                const buffer = Buffer.from(result);
                const b64Encoding = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
                return {
                    src: b64Encoding + buffer.toString('base64'),
                };
                break;
        }
    }
}
