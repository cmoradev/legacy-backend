import { Module } from '@nestjs/common';
import { SchoolChargesDetailsExtraChargesService } from './school-charges-details-extra-charges.service';
import { SchoolChargesDetailsExtraChargesController } from './school-charges-details-extra-charges.controller';

@Module({
  providers: [SchoolChargesDetailsExtraChargesService],
  controllers: [SchoolChargesDetailsExtraChargesController]
})
export class SchoolChargesDetailsExtraChargesModule {}
