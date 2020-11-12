import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { Repository } from 'typeorm';
import { AcademyChargePayments } from './entities/academy-charge-payments.entity';
import {
    QueryBilling,
    QuerySimpleReport,
} from '../../../mini-store/store-sales/mini-store-sales-payments/interface/InvoiceMiniStore.interface';
import { User } from '../../../system/users/entities/user.entity';
import { AcademyCharge } from '../academy-charge/entities/academy-charge.entity';
import { InvoiceMethodPayment } from '../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import moment = require('moment');
import { SimpleReport } from '../../../mini-store/store-sales/mini-store-sales-payments/reports/simple.report';
import { SimpleReportAcademy } from './reports/simple.report';
import { add, round, sub } from 'exact-math';
import { MiniStoreSale } from '../../../mini-store/store-sales/mini-store-sales/entities/mini-store-sale.entity';
import { MiniStoreSalePayment } from '../../../mini-store/store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { QueryBillingAcademy } from './types/InvoiceAcademy.interface';
import { BranchOffice } from '../../../system/branch-office/entities/branch-office.entity';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { MiniStoreSaleMethodPayment } from '../../../mini-store/store-sales/mini-store-sales-methods-payments/entities/mini-store-sale-method-payment.entity';
import { AcademyChargeMethodsPayments } from '../academy-charge-methods-payments/entities/academy-charge-methods-payments.entity';

@Injectable()
export class AcademyChargePaymentsService extends TypeOrmCrudService<AcademyChargePayments> {
    constructor(
        @InjectRepository(AcademyChargePayments, ColegioDBNameConnection) readonly repo: Repository<AcademyChargePayments>,
        @InjectRepository(User, ColegioDBNameConnection) readonly userRepository: Repository<User>,
        @InjectRepository(InvoiceMethodPayment, ColegioDBNameConnection) readonly invoiceMethodPaymentRepository: Repository<InvoiceMethodPayment>,
        @InjectRepository(AcademyCharge, ColegioDBNameConnection) readonly academyRepository: Repository<AcademyCharge>,
    ) {
        super(repo);
    }

    async fetchFilteredPayments(query: QuerySimpleReport): Promise<AcademyChargePayments[]> {
        const paymentsQueryBuilder = this.repo.createQueryBuilder('payment');
        // paymentsQueryBuilder.leftJoinAndSelect('payment.storePaymentOffice', 'storePaymentOffice');
        paymentsQueryBuilder.leftJoinAndSelect('payment.cashierCharge', 'cashierCharge');
        paymentsQueryBuilder.leftJoinAndSelect('payment.academyCharge', 'academyCharge');
        paymentsQueryBuilder.leftJoinAndSelect('academyCharge.schoolStudent', 'schoolStudent');
        paymentsQueryBuilder.leftJoinAndSelect('payment.methodsPayments', 'methodsPayments');
        paymentsQueryBuilder.leftJoinAndSelect('methodsPayments.invoiceMethodPayment', 'invoiceMethodPayment');
        paymentsQueryBuilder.leftJoinAndSelect('payment.academyChargesInvoice', 'academyChargesInvoice');
        if (query) {

            /* paymentsQueryBuilder.where('storePaymentOffice.id= :officeId', {
                officeId: query.branchOfficeId,
            }); */

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
                paymentsQueryBuilder.andWhere('cashierCharge.id = :agentID', { agentID: query.cashier });
            }
        }
        return await paymentsQueryBuilder.getMany();
    }

    async fetchFilteredSales(query: QuerySimpleReport): Promise<AcademyCharge[]> {
        const salesQueryBuilder = this.academyRepository.createQueryBuilder('charge');
        salesQueryBuilder.leftJoinAndSelect('charge.chargeCampus', 'chargeCampus');
        salesQueryBuilder.leftJoinAndSelect('charge.cashier', 'cashier');
        salesQueryBuilder.leftJoinAndSelect('charge.schoolStudent', 'schoolStudent');
        salesQueryBuilder.leftJoinAndSelect('charge.chargesPayments', 'chargesPayments');
        salesQueryBuilder.leftJoinAndSelect('charge.chargesDetails', 'chargesDetails');
        salesQueryBuilder.leftJoinAndSelect('chargesDetails.extraCharges', 'extraCharges');
        salesQueryBuilder.leftJoinAndSelect('chargesDetails.academyInscriptionConcept', 'academyInscriptionConcept');
        if (query) {
            /*salesQueryBuilder.where('storeBranchOffice.id= :officeId', {
                officeId: query.branchOfficeId,
            });*/
            salesQueryBuilder.andWhere('chargesPayments.paymentStatus= :paymentStatus', {
                paymentStatus: query.status,
            });
            /*if (query.invoiceStatus) {
                salesQueryBuilder.andWhere('payments.stamping= :invoiceStatus', {
                        invoiceStatus: query.invoiceStatus,
                    },
                );
            }*/
            salesQueryBuilder.andWhere('chargesPayments.createdAt BETWEEN :startDate AND :endDate',
                {
                    startDate: moment(query.startDate).startOf('day').toDate(),
                    endDate: moment(query.endDate).endOf('day').toDate(),
                });
            if (query.cashier) {
                salesQueryBuilder.andWhere('cashier.id = :agentID', { agentID: query.cashier });
            }
        }
        return await salesQueryBuilder.getMany();
    }

    public async getUserCasher(): Promise<User[]> {
        const cashiersAndSales = await this.userRepository.find({
            relations: ['salePayments', 'department'],
            select: ['id', 'name'],
        });
        const cashiers = cashiersAndSales.filter(cashier => {
            if (cashier.department !== null && cashier.department.id === 2 || cashier.salePayments.length > 0) {
                return cashier;
            }
        });
        return cashiers;
    }

    async simpleReport(payments: AcademyChargePayments[], sales: AcademyCharge[], options?: { base64: boolean }): Promise<string | any> {

        const cashiersAndSales = await this.userRepository.find({
            relations: ['academyChargesPayments', 'department', 'role'],
        });
        const paymentMethods = await this.invoiceMethodPaymentRepository.find({
            where: {
                showReport: true,
                isActive: true,
            },
        });

        const cashiers = cashiersAndSales.filter(cashier => {
            if (cashier.role.id === 5 && cashier.department.id === 2 || cashier.academyChargesPayments.length > 0) {
                return cashier;
            }
        });

        const workbook = new SimpleReportAcademy().generate({
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
                await workbook.xlsx.writeFile('./xls-imports/' + fileName);
                return fileName;
            }
        } catch (e) {
            return e;
        }
    }

    async findSaleByPayment(query: QueryBillingAcademy): Promise<{
        charge: AcademyCharge,
        payment: AcademyChargePayments,
        highestPayment: AcademyChargeMethodsPayments
    }> {
        const charge = await this.academyRepository.findOne({
            where: {
                id: query.chargeId,
            },
            relations: [
                'chargesDetails',
                'chargesDetails.academyInscriptionConcept',
                'chargesDetails.extraCharges',
            ],
        });

        const payment = await this.repo.findOne({
            where: {
                id: query.chargePaymentId,
            },
            relations: [
                'methodsPayments',
            ],
        });

        return {
            charge,
            payment,
            highestPayment: this.getHighestPayment(payment.methodsPayments),
        };
    }

    getHighestPayment(formadepago: AcademyChargeMethodsPayments[]) {
        const methodpaymenst = formadepago.sort((a, b) => {
            return a.quantity - b.quantity;
        });

        return methodpaymenst[0];
    }

    async updatePayment(data: AcademyChargePayments) {
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
        const pathInvoice = '/var/www/pdc/comprobantes/academias/' + uuid.toUpperCase();
        const mailOptions: Mail.Options = {
            to: email,
            from: currentBranch.Email,
            subject: 'Academias  - Comprobantes de pago CFDI',
            text: 'CFDI',
            html: '<div> <h2>Gracias por su pago</h2><br><p>Adjuntos, le enviamos su factura electrónica y archivo XML</p><br><br><p>Academias del Colegio Inglés</p></div>',
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

    async countTotalPayments(dateStart: string, dateEnd: string, ciclyId: number, branchOfficeId: number) {
        return await this.repo.createQueryBuilder('payments')
            .leftJoinAndSelect('payments.academyPaymentOffice', 'academyPaymentOffice', 'academyPaymentOffice.id=:branchOfficeId', { branchOfficeId })
            .leftJoinAndSelect('payments.academyCharge', 'academyCharge')
            .leftJoinAndSelect('academyCharge.chargeCycle', 'chargeCycle', 'chargeCycle.id=:cycleId', { cycleId: ciclyId })
            .select('SUM(payments.quantity-payments.change)', 'sum')
            .where(`DATE(payments.createdAt) BETWEEN '${dateStart}' AND '${dateEnd}'`)
            .getRawOne();

    }
}
