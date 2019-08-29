import { Module } from '@nestjs/common';
import { XlsImporterController } from './xls-importer.controller';
import { XlsImporterService } from './xls-importer.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [
        MulterModule.register({
            dest: '/xls-imports',
        }),
    ],
    controllers: [XlsImporterController],
    providers: [XlsImporterService],
})
export class XlsImporterModule {
}
