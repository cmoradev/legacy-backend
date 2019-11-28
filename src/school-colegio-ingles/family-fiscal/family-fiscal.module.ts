import { Module } from '@nestjs/common';
import { FamilyFiscalService } from './family-fiscal.service';
import { FamilyFiscalController } from './family-fiscal.controller';

@Module({
  providers: [FamilyFiscalService],
  controllers: [FamilyFiscalController]
})
export class FamilyFiscalModule {}
