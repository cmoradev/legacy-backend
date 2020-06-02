import { Module } from '@nestjs/common';
import { AcademyChargePaymentsController } from './academy-charge-payments.controller';
import { AcademyChargePaymentsService } from './academy-charge-payments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { AcademyChargePayments } from './entities/academy-charge-payments.entity';
import { User } from '../../../system/users/entities/user.entity';
import { InvoiceMethodPayment } from '../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import { InvoiceMethodsPaymentsModule } from '../../../invoice/invoice-methods-payments/invoice-methods-payments.module';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                AcademyChargePayments,
                User,
                InvoiceMethodPayment,
            ], ColegioDBNameConnection),
        InvoiceMethodsPaymentsModule,
    ],
    controllers: [AcademyChargePaymentsController],
    providers: [AcademyChargePaymentsService],
})
export class AcademyChargePaymentsModule {
}
