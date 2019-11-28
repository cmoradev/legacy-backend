import { Module } from '@nestjs/common';
import { AcademyChargeWayOfPayingService } from './academy-charge-way-of-paying.service';
import { AcademyChargeWayOfPayingController } from './academy-charge-way-of-paying.controller';

@Module({
  providers: [AcademyChargeWayOfPayingService],
  controllers: [AcademyChargeWayOfPayingController]
})
export class AcademyChargeWayOfPayingModule {}
