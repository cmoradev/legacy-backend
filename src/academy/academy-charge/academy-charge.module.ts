import { Module } from '@nestjs/common';
import { AcademyChargeService } from './academy-charge.service';
import { AcademyChargeController } from './academy-charge.controller';

@Module({
  providers: [AcademyChargeService],
  controllers: [AcademyChargeController]
})
export class AcademyChargeModule {}
