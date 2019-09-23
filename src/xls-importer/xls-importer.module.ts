import { Module } from '@nestjs/common';
import { XlsImporterController } from './xls-importer.controller';
import { XlsImporterService } from './xls-importer.service';
import { MulterModule } from '@nestjs/platform-express';
import { MiniStoreProductsModule } from '../mini-store/mini-store-products/mini-store-products.module';

@Module({
    imports: [
        MulterModule.register({
            dest: '/xls-imports',
        }),
        MiniStoreProductsModule,
    ],
    controllers: [XlsImporterController],
    providers: [XlsImporterService],
})
export class XlsImporterModule {
}
