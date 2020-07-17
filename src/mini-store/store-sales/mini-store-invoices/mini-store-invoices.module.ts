import { Module } from '@nestjs/common';
import { MiniStoreInvoicesService } from './mini-store-invoices.service';
import { MiniStoreInvoicesController } from './mini-store-invoices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiniStoreInvoice } from './entities/mini-store-invoice.entity';
import { MiniStoreSalesPaymentsModule } from '../mini-store-sales-payments/mini-store-sales-payments.module';
import { UsersModule } from '../../../system/users/users.module';
import { BranchOfficeSettingModule } from '../../../system/branch-office-setting/branch-office-setting.module';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { SmartWeb } from '../../../Provider/swsmart.provider';
import { BranchOfficeModule } from '../../../system/branch-office/branch-office.module';

@Module({
    imports: [TypeOrmModule.forFeature([MiniStoreInvoice], ColegioDBNameConnection),
        MiniStoreSalesPaymentsModule,
        UsersModule,
        BranchOfficeModule,
        BranchOfficeSettingModule,
        MiniStoreSalesPaymentsModule,
    ],
    exports: [MiniStoreInvoicesService],
    providers: [MiniStoreInvoicesService, SmartWeb],
    controllers: [MiniStoreInvoicesController],
})
export class MiniStoreInvoicesModule {
}
