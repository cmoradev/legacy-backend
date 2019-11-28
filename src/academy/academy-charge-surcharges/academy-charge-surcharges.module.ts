import { Module } from '@nestjs/common';
import { AcademyChargeSurchargesService } from './academy-charge-surcharges.service';
import { AcademyChargeSurchargesController } from './academy-charge-surcharges.controller';

@Module({
  providers: [AcademyChargeSurchargesService],
  controllers: [AcademyChargeSurchargesController]
})
export class AcademyChargeSurchargesModule {}
