import { Module } from '@nestjs/common';
import { XlsImporterController } from './xls-importer.controller';
import { XlsImporterService } from './xls-importer.service';
import { MulterModule } from '@nestjs/platform-express';
import { MiniStoreProductsModule } from '../mini-store/mini-store-products/mini-store-products.module';
import { MiniStorePricesListsModule } from '../mini-store/mini-store-prices-lists/mini-store-prices-lists.module';
import { MiniStoreClassificationsModule } from '../mini-store/mini-store-classifications/mini-store-classifications.module';
import { InvoiceKeysModule } from '../invoice/invoice-keys/invoice-keys.module';
import { BranchOfficeModule } from '../system/branch-office/branch-office.module';
import { StudentsModule } from '../school-colegio-ingles/students/students.module';
import { FamiliesModule } from '../school-colegio-ingles/families/families.module';


@Module({
    imports: [
        MulterModule.register({
            dest: '/var/www/uploads/temp',
        }),
        MiniStoreProductsModule,
        MiniStorePricesListsModule,
        MiniStoreClassificationsModule,
        InvoiceKeysModule,
        BranchOfficeModule,
        StudentsModule,
        FamiliesModule,
    ],
    controllers: [XlsImporterController],
    providers: [XlsImporterService],
})
export class XlsImporterModule {
}
