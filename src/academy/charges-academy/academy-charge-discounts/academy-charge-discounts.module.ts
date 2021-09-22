import { Module } from '@nestjs/common';
import { AcademyChargeDiscountsService } from './academy-charge-discounts.service';
import { AcademyChargeDiscountsController } from './academy-charge-discounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../common/databases/colegiodb.service';
import { AcademyChargeDiscounts } from './entities/academy-charge-discounts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AcademyChargeDiscounts], ColegioDBNameConnection)],
  exports: [AcademyChargeDiscountsService],
  providers: [AcademyChargeDiscountsService],
  controllers: [AcademyChargeDiscountsController],
})
export class AcademyChargeDiscountsModule {
}
