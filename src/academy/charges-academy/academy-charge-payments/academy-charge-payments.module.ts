import { forwardRef, Module } from '@nestjs/common';
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
import { BranchOfficeModule } from '../../../system/branch-office/branch-office.module';
import { BranchOfficeSettingModule } from '../../../system/branch-office-setting/branch-office-setting.module';
import { AcademyChargeInvoiceModule } from '../academy-charge-invoice/academy-charge-invoice.module';
import { SmartWeb } from '../../../Provider/swsmart.provider';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                AcademyChargePayments,
                User,
                InvoiceMethodPayment,
                AcademyCharge,
            ], ColegioDBNameConnection),
        BranchOfficeModule,
        BranchOfficeSettingModule,
        forwardRef(() => AcademyChargeInvoiceModule),
        InvoiceMethodsPaymentsModule,
        AcademyChargeModule,
    ],
    controllers: [AcademyChargePaymentsController],
    providers: [AcademyChargePaymentsService, SmartWeb],
    exports: [AcademyChargePaymentsService],
})
export class AcademyChargePaymentsModule {
}
