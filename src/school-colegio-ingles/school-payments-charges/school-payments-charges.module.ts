import { Module } from '@nestjs/common';
import { SchoolPaymentsChargesController } from './school-payments-charges.controller';
import { SchoolPaymentsChargesService } from './school-payments-charges.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { SchoolPaymentCharge } from './entities/school-payment-charge.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ SchoolPaymentCharge ], ColegioDBNameConnection) ],
  controllers: [ SchoolPaymentsChargesController ],
  providers: [ SchoolPaymentsChargesService ],
})
export class SchoolPaymentsChargesModule {
}
