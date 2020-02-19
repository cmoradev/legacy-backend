import { Module } from '@nestjs/common';
import { SchoolChargesController } from './school-charges.controller';
import { SchoolChargesService } from './school-charges.service';

@Module({
  controllers: [SchoolChargesController],
  providers: [SchoolChargesService]
})
export class SchoolChargesModule {}
