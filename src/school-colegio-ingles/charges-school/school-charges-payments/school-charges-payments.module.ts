import { forwardRef, Module } from '@nestjs/common';
import { SchoolChargesPaymentsService } from './school-charges-payments.service';
import { SchoolChargesPaymentsController } from './school-charges-payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolChargesMethodsPayments } from '../school-charges-methods-payments/entities/school-charges-methods-payments.entity';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { SchoolChargePayment } from './entities/school-charge-payment.entity';
import { SchoolCharge } from '../school-charges/entities/school-charge.entity';
import { SmartWeb } from '../../../Provider/swsmart.provider';
import { InvoiceMethodPayment } from '../../../invoice/invoice-methods-payments/entities/invoice-method-payment.entity';
import { BranchOfficeModule } from '../../../system/branch-office/branch-office.module';
import { BranchOfficeSettingModule } from '../../../system/branch-office-setting/branch-office-setting.module';
import { AcademyChargeInvoiceModule } from '../../../academy/charges-academy/academy-charge-invoice/academy-charge-invoice.module';
import { InvoiceMethodsPaymentsModule } from '../../../invoice/invoice-methods-payments/invoice-methods-payments.module';
import { User } from '../../../system/users/entities/user.entity';
import { SchoolChargesModule } from '../school-charges/school-charges.module';
import { ChargesSchoolModule } from '../charges-school.module';
import { SchoolPaymentsModule } from '../../school-payments/school-payments.module';
import { SchoolChargesInvoiceModule } from '../school-charges-invoice/school-charges-invoice.module';
import { ConfigModule } from '../../../config/config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SchoolChargePayment, SchoolCharge, InvoiceMethodPayment, User], ColegioDBNameConnection),
    BranchOfficeModule,
    BranchOfficeSettingModule,
    InvoiceMethodsPaymentsModule,
    forwardRef(() => ChargesSchoolModule),
    SchoolPaymentsModule,
    SchoolChargesInvoiceModule,
    ConfigModule
  ],
  providers: [SchoolChargesPaymentsService, SmartWeb],
  controllers: [SchoolChargesPaymentsController],
  exports: [SchoolChargesPaymentsService],
})
export class SchoolChargesPaymentsModule {
}
