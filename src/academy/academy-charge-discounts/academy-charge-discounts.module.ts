import { Module } from '@nestjs/common';
import { AcademyChargeDiscountsService } from './academy-charge-discounts.service';
import { AcademyChargeDiscountsController } from './academy-charge-discounts.controller';

@Module({
  providers: [AcademyChargeDiscountsService],
  controllers: [AcademyChargeDiscountsController]
})
export class AcademyChargeDiscountsModule {}
