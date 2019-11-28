import { Module } from '@nestjs/common';
import { AcademyChargeDetailsService } from './academy-charge-details.service';
import { AcademyChargeDetailsController } from './academy-charge-details.controller';

@Module({
  providers: [AcademyChargeDetailsService],
  controllers: [AcademyChargeDetailsController]
})
export class AcademyChargeDetailsModule {}
