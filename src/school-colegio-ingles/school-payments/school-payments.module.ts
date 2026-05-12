import { Module } from '@nestjs/common';
import { SchoolPaymentsController } from './school-payments.controller';
import { SchoolPaymentsService } from './school-payments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolPayment } from './entities/school-payment.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { MiniStoreSale } from '../../mini-store/store-sales/mini-store-sales/entities/mini-store-sale.entity';
import { MiniStoreSalePayment } from '../../mini-store/store-sales/mini-store-sales-payments/entities/mini-store-sale-payment.entity';
import { SchoolChargeDetails } from '../charges-school/school-charges-details/entities/school-charge-details.entity';
import { SchoolCharge } from '../charges-school/school-charges/entities/school-charge.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        SchoolPayment,
        MiniStoreSale,
        MiniStoreSalePayment,
        SchoolChargeDetails,
        SchoolCharge,
      ],
      ColegioDBNameConnection,
    ),
  ],
  controllers: [SchoolPaymentsController],
  providers: [SchoolPaymentsService],
})
export class SchoolPaymentsModule {
}
