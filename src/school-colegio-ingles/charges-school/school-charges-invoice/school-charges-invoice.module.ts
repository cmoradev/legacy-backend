import { Module } from '@nestjs/common';
import { SchoolChargesInvoiceService } from './school-charges-invoice.service';
import { SchoolChargesInvoiceController } from './school-charges-invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { SchoolChargesInvoice } from './entities/school-charges-invoice.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SchoolChargesInvoice], ColegioDBNameConnection)],
    providers: [SchoolChargesInvoiceService],
    controllers: [SchoolChargesInvoiceController],
    exports: [SchoolChargesInvoiceService]
})
export class SchoolChargesInvoiceModule {
}
