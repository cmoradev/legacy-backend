import { Module } from '@nestjs/common';
import { SchoolChargesDetailsService } from './school-charges-details.service';
import { SchoolChargesDetailsController } from './school-charges-details.controller';

@Module({
  providers: [SchoolChargesDetailsService],
  controllers: [SchoolChargesDetailsController]
})
export class SchoolChargesDetailsModule {}
