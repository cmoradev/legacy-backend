import { Module } from '@nestjs/common';
import { AcademyChargePaymentsController } from './academy-charge-payments.controller';
import { AcademyChargePaymentsService } from './academy-charge-payments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { AcademyChargePayments } from './entities/academy-charge-payments.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AcademyChargePayments], ColegioDBNameConnection)],
    controllers: [AcademyChargePaymentsController],
    providers: [AcademyChargePaymentsService],
})
export class AcademyChargePaymentsModule {
}
