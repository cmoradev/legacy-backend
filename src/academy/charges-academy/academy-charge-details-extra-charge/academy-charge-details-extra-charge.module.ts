import { Module } from '@nestjs/common';
import { AcademyChargeDetailsExtraChargeController } from './academy-charge-details-extra-charge.controller';
import { AcademyChargeDetailsExtraChargeService } from './academy-charge-details-extra-charge.service';

@Module({
  controllers: [AcademyChargeDetailsExtraChargeController],
  providers: [AcademyChargeDetailsExtraChargeService]
})
export class AcademyChargeDetailsExtraChargeModule {}
