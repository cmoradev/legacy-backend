import { forwardRef, Module } from '@nestjs/common';
import { AcademyChargeInvoiceService } from './academy-charge-invoice.service';
import { AcademyChargeInvoiceController } from './academy-charge-invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { AcademyChargeInvoice } from './entities/academy-charge-invoice.entity';
import { UsersModule } from '../../../system/users/users.module';
import { BranchOfficeModule } from '../../../system/branch-office/branch-office.module';
import { BranchOfficeSettingModule } from '../../../system/branch-office-setting/branch-office-setting.module';
import { MiniStoreSalesPaymentsModule } from '../../../mini-store/store-sales/mini-store-sales-payments/mini-store-sales-payments.module';
import { SmartWeb } from '../../../Provider/swsmart.provider';
import { AcademyChargePaymentsModule } from '../academy-charge-payments/academy-charge-payments.module';
import { MiniStoreInvoicesModule } from '../../../mini-store/store-sales/mini-store-invoices/mini-store-invoices.module';
import {AcademyChargeDiscountsModule} from '../academy-charge-discounts/academy-charge-discounts.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([AcademyChargeInvoice], ColegioDBNameConnection),
        UsersModule,
        BranchOfficeModule,
        BranchOfficeSettingModule,
        AcademyChargeDiscountsModule,
        forwardRef(() => AcademyChargePaymentsModule),
    ],
    controllers: [AcademyChargeInvoiceController],
    providers: [AcademyChargeInvoiceService, SmartWeb],
    exports: [AcademyChargeInvoiceService],
})
export class AcademyChargeInvoiceModule {
}
