import { Module } from '@nestjs/common';
import { SchoolChargesMethodsPaymentsService } from './school-charges-methods-payments.service';
import { SchoolChargesMethodsPaymentsController } from './school-charges-methods-payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { SchoolChargesMethodsPayments } from './entities/school-charges-methods-payments.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SchoolChargesMethodsPayments], ColegioDBNameConnection)],
    providers: [SchoolChargesMethodsPaymentsService],
    controllers: [SchoolChargesMethodsPaymentsController],
})
export class SchoolChargesMethodsPaymentsModule {
}
