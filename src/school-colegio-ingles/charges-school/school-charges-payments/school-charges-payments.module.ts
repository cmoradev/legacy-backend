import { Module } from '@nestjs/common';
import { SchoolChargesPaymentsService } from './school-charges-payments.service';
import { SchoolChargesPaymentsController } from './school-charges-payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolChargesMethodsPayments } from '../school-charges-methods-payments/entities/school-charges-methods-payments.entity';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { SchoolChargePayment } from './entities/school-charge-payment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SchoolChargePayment], ColegioDBNameConnection)],
    providers: [SchoolChargesPaymentsService],
    controllers: [SchoolChargesPaymentsController],
})
export class SchoolChargesPaymentsModule {
}
