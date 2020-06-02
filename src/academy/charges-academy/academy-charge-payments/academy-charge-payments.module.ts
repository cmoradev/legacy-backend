import { Module } from '@nestjs/common';
import { AcademyChargePaymentsController } from './academy-charge-payments.controller';
import { AcademyChargePaymentsService } from './academy-charge-payments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { AcademyChargePayments } from './entities/academy-charge-payments.entity';
import { User } from '../../../system/users/entities/user.entity';
import { InvoiceMethodPayment } from '../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import { InvoiceMethodsPaymentsModule } from '../../../invoice/invoice-methods-payments/invoice-methods-payments.module';
import { AcademyChargeModule } from '../academy-charge/academy-charge.module';
import { AcademyCharge } from '../academy-charge/entities/academy-charge.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                AcademyChargePayments,
                User,
                InvoiceMethodPayment,
                AcademyCharge,
            ], ColegioDBNameConnection),
        InvoiceMethodsPaymentsModule,
        AcademyChargeModule,
    ],
    controllers: [AcademyChargePaymentsController],
    providers: [AcademyChargePaymentsService],
})
export class AcademyChargePaymentsModule {
}
