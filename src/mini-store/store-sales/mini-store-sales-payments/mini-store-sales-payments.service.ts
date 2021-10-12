import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStoreSalePayment } from './entities/mini-store-sale-payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SimpleReport } from './reports/simple.report';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { SalesReturns } from '../mini-store-sales-returns/entities/sales-returns.entity';
import { User } from '../../../system/users/entities/user.entity';
import { InvoiceMethodPayment } from '../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import { MiniStoreSale } from '../mini-store-sales/entities/mini-store-sale.entity';
import { QueryBilling, QuerySimpleReport } from './interface/InvoiceMiniStore.interface';
import * as nodemailer from 'nodemailer';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import Mail from 'nodemailer/lib/mailer';
import { MiniStoreSaleMethodPayment } from '../mini-store-sales-methods-payments/entities/mini-store-sale-method-payment.entity';
import { CommissionsReport } from './reports/commissions.report';
import { CellRow } from './utils/generate-matriz-by-payment';
import { ConfigService } from '../../../common/config/config.service';
import moment = require('moment');

@Injectable()
export class MiniStoreSalesPaymentsService extends TypeOrmCrudService<MiniStoreSalePayment> {
    constructor(
        @InjectRepository(MiniStoreSalePayment, ColegioDBNameConnection) readonly repo: Repository<MiniStoreSalePayment>,
        @InjectRepository(SalesReturns, ColegioDBNameConnection) readonly salesReturnsRepository: Repository<SalesReturns>,
        @InjectRepository(User, ColegioDBNameConnection) readonly userRepository: Repository<User>,
        @InjectRepository(MiniStoreSale, ColegioDBNameConnection) readonly salesRepository: Repository<MiniStoreSale>,
        @InjectRepository(InvoiceMethodPayment, ColegioDBNameConnection)
        readonly invoiceMethodPaymentRepository: Repository<InvoiceMethodPayment>,
        private readonly configService: ConfigService,
    ) {
        super(repo);
    }

    public async softDeleteOne(id: number) {
        const object = await this.findOne(id);
        if (!object) {
            throw new NotFoundException('This entity does not exists');
        }
        return await this.repo.softDelete(id);
    }

    public async softRestoreOne(id: number) {
        const object = await this.repo.findOne({ id }, { withDeleted: true });
        if (!object) {
            throw new NotFoundException('This entity does not exists');
        }
        return await this.repo.restore(id);
    }

    async countTotalPayments(dateStart: string, dateEnd: string, id: number) {
        return await this.repo.createQueryBuilder('payments')
            .select('SUM(payments.quantity)', 'sum')
            .where('payments.cashierBillingId = :id', { id })
            .andWhere(`DATE(payments.createdAt) BETWEEN '${dateStart}' AND '${dateEnd}'`)
            .getRawOne();

    }

    async fetchFilteredReturns(query: QuerySimpleReport) {
        const salesReturnsQB = this.salesReturnsRepository.createQueryBuilder('saleReturn');
        salesReturnsQB.leftJoinAndSelect('saleReturn.agent', 'agent');
        salesReturnsQB.leftJoinAndSelect('saleReturn.sale', 'sale');
        salesReturnsQB.leftJoinAndSelect('sale.storeBranchOffice', 'storeBranchOffice');
        salesReturnsQB.leftJoinAndSelect('saleReturn.details', 'details');
        salesReturnsQB.leftJoinAndSelect('details.saleDetail', 'saleDetail');
        salesReturnsQB.leftJoinAndSelect('saleDetail.miniStoreProduct', 'product');
        salesReturnsQB.leftJoinAndSelect('sale.student', 'student');
        salesReturnsQB.leftJoinAndSelect('saleReturn.paymentMethod', 'paymentMethod');
        if (query) {

            salesReturnsQB.where('storeBranchOffice.id= :officeId', {
                officeId: query.branchOfficeId,
            });

            salesReturnsQB.andWhere('saleReturn.createdAt BETWEEN :startDate AND :endDate',
                {
                    startDate: moment(query.startDate).startOf('day').toDate(),
                    endDate: moment(query.endDate).endOf('day').toDate(),
                });
            if (query.cashier) {
                salesReturnsQB.andWhere('agent.id = :agentID', { agentID: query.cashier });
            }
        }
        return salesReturnsQB.getMany();
    }

    async fetchFilteredPayments(query: QuerySimpleReport): Promise<MiniStoreSalePayment[]> {
        const paymentsQueryBuilder = this.repo.createQueryBuilder('payment');
        paymentsQueryBuilder.leftJoinAndSelect('payment.storePaymentOffice', 'storePaymentOffice');
        paymentsQueryBuilder.leftJoinAndSelect('payment.agent', 'agent');
        paymentsQueryBuilder.leftJoinAndSelect('payment.miniStoreSale', 'sale');
        paymentsQueryBuilder.leftJoinAndSelect('sale.student', 'student');
        paymentsQueryBuilder.leftJoinAndSelect('payment.miniStoreSaleMethodPayments', 'paymentMethod');
        paymentsQueryBuilder.leftJoinAndSelect('paymentMethod.invoiceMethod', 'invoiceMethod');
        if (query) {

            paymentsQueryBuilder.where('storePaymentOffice.id= :officeId', {
                officeId: query.branchOfficeId,
            });

            paymentsQueryBuilder.andWhere('payment.paymentStatus= :paymentStatus', {
                paymentStatus: query.status,
            });

            paymentsQueryBuilder.andWhere('payment.createdAt BETWEEN :startDate AND :endDate',
                {
                    startDate: moment(query.startDate).startOf('day').toDate(),
                    endDate: moment(query.endDate).endOf('day').toDate(),
                });
            if (query.invoiceStatus) {
                paymentsQueryBuilder.andWhere('payment.stamping = :invoiceStatus', { invoiceStatus: query.invoiceStatus });
            }
            if (query.cashier) {
                paymentsQueryBuilder.andWhere('agent.id = :agentID', { agentID: query.cashier });
            }
        }
        return await paymentsQueryBuilder.getMany();
    }

    async fetchFilteredSales(query: QuerySimpleReport): Promise<MiniStoreSale[]> {
        const salesQueryBuilder = this.salesRepository.createQueryBuilder('sale');
        salesQueryBuilder.leftJoinAndSelect('sale.storeBranchOffice', 'storeBranchOffice');
        salesQueryBuilder.leftJoinAndSelect('sale.cashier', 'agent');
        salesQueryBuilder.leftJoinAndSelect('sale.student', 'student');
        salesQueryBuilder.leftJoinAndSelect('sale.miniStoreSalePayments', 'payments');
        salesQueryBuilder.leftJoinAndSelect('sale.miniStoreSaleDetails', 'details');
        salesQueryBuilder.leftJoinAndSelect('details.miniStoreProduct', 'products');
        if (query) {
            salesQueryBuilder.where('storeBranchOffice.id= :officeId', {
                officeId: query.branchOfficeId,
            });
            salesQueryBuilder.andWhere('payments.paymentStatus= :paymentStatus', {
                paymentStatus: query.status,
            });
            if (query.invoiceStatus) {
                salesQueryBuilder.andWhere('payments.stamping= :invoiceStatus', {
                        invoiceStatus: query.invoiceStatus,
                    },
                );
            }
            salesQueryBuilder.andWhere('payments.createdAt BETWEEN :startDate AND :endDate',
                {
                    startDate: moment(query.startDate).startOf('day').toDate(),
                    endDate: moment(query.endDate).endOf('day').toDate(),
                });
            if (query.cashier) {
                salesQueryBuilder.andWhere('agent.id = :agentID', { agentID: query.cashier });
            }
        }
        return await salesQueryBuilder.getMany();
    }

    public async getUserCasher(): Promise<User[]> {
        const cashiersAndSales = await this.userRepository.find({
            relations: ['salePayments', 'department'],
            select: ['id', 'name'],
        });
        return cashiersAndSales.filter(cashier => {
            if (cashier.department !== null && cashier.department.id === 2 || cashier.salePayments.length > 0) {
                return cashier;
            }
        });
    }

    async downloadReport(payments: MiniStoreSalePayment[],
                         sales: MiniStoreSale[],
                         salesReturns: SalesReturns[],
                         cashiers: User[],
                         paymentMethods: InvoiceMethodPayment[],
                         matriz: CellRow[][]) {
        return new SimpleReport().generate({
            payments,
            cashiers,
            paymentMethods,
            salesReturns,
            sales,
        }, matriz);
    }

    async simpleReport(payments: MiniStoreSalePayment[],
                       sales: MiniStoreSale[],
                       salesReturns: SalesReturns[],
                       cashiers: User[],
                       paymentMethods: InvoiceMethodPayment[],
                       matriz: CellRow[][],
                       options?: { base64: boolean }): Promise<string | any> {


        const workbook = new SimpleReport().generate({
            payments,
            cashiers,
            paymentMethods,
            salesReturns,
            sales,
        }, matriz);
        try {
            const fileName = (+new Date()).toString() + '.xlsx';
            if (options && options.base64) {
                const result = await workbook.xlsx.writeBuffer({
                        filename: (+new Date()).toString() + '.xlsx',
                    },
                );
                const buffer = Buffer.from(result);
                const b64Encoding = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
                return b64Encoding + buffer.toString('base64');

            } else {
                await workbook.xlsx.writeFile('./xls-imports/' + fileName);
                return fileName;
            }
        } catch (e) {
            return e;
        }
    }

    async reportCommission(
        quantityCommissions: number,
        payments: MiniStoreSalePayment[],
        sales: MiniStoreSale[],
        options?: { base64: boolean }): Promise<string | any> {

        const cashiersAndSales = await this.userRepository.find({
            relations: ['salePayments', 'department', 'role'],
        });

        const paymentMethods = await this.invoiceMethodPaymentRepository.find({
            where: {
                showReport: true,
                isActive: true,
            },
        });

        const cashiers = cashiersAndSales.filter(cashier => {
            if (cashier.role.id === 5 && cashier.department.id === 2 || cashier.salePayments.length > 0) {
                return cashier;
            }
        });
        const report = new CommissionsReport();
        const workbook = report.generate({
            quantityCommissions,
            payments,
            cashiers,
            paymentMethods,
            sales,
        });
        try {
            const fileName = (+new Date()).toString() + '.xlsx';
            if (options && options.base64) {
                const result = await workbook.xlsx.writeBuffer({
                        filename: (+new Date()).toString() + '.xlsx',
                    },
                );
                const buffer = Buffer.from(result);
                const b64Encoding = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
                return b64Encoding + buffer.toString('base64');

            } else {
                return await workbook.xlsx.writeFile('./xls-imports/' + fileName);
            }
        } catch (e) {
            return e;
        }
    }

    async findSaleByPayment(query: QueryBilling): Promise<{ sale: MiniStoreSale, payment: MiniStoreSalePayment, highestPayment: MiniStoreSaleMethodPayment }> {
        const sale = await this.salesRepository.findOne({
            where: {
                id: query.saleId,
            },
            relations: [
                'miniStoreSaleDetails',
                'miniStoreSaleDetails.miniStoreProduct',
                'miniStoreSaleDetails.extraCharges',
            ],
        });

        const payment = await this.repo.findOne({
            where: {
                id: query.salePaymentId,
            },
            relations: [
                'miniStoreSaleMethodPayments',
            ],
        });

        return {
            sale,
            payment,
            highestPayment: this.getHighestPayment(payment.miniStoreSaleMethodPayments),
        };
    }

    getHighestPayment(formadepago: MiniStoreSaleMethodPayment[]) {
        const methodpaymenst = formadepago.sort((a, b) => {
            return a.quantity - b.quantity;
        });

        return methodpaymenst[0];
    }

    async updatePayment(data: MiniStoreSalePayment) {
        let payment = await this.repo.findOne({ id: data.id });
        payment = { ...data };
        return await this.repo.save(payment);
    }

    async sendMail(currentBranch: BranchOffice, uuid: string, email: string) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: currentBranch.Email,
                pass: currentBranch.EmailPass,
            },
        });
        const pathInvoice = `${this.configService.getPath()}comprobantes/tienda/` + uuid.toUpperCase();
        const mailOptions: Mail.Options = {
            to: email,
            from: currentBranch.Email,
            subject: 'Tienda  - Comprobantes de pago CFDI',
            text: 'CFDI',
            html: '<div> <h2>Gracias por su compra</h2><br><p>Adjuntos, le enviamos su factura electrónica y archivo XML</p><br><br></div>',
            attachments: [
                {
                    filename: uuid.toUpperCase() + '.xml',
                    path: `${pathInvoice}.xml`,
                },
                {
                    filename: uuid.toUpperCase() + '.pdf',
                    path: `${pathInvoice}.pdf`,
                },
            ],
        };
        return await transporter.sendMail(mailOptions);
    }
}
