import { Module } from '@nestjs/common';
import { AcademyInscriptionStatusService } from './academy-inscription-status.service';
import { AcademyInscriptionStatusController } from './academy-inscription-status.controller';

@Module({
  providers: [AcademyInscriptionStatusService],
  controllers: [AcademyInscriptionStatusController]
})
export class AcademyInscriptionStatusModule {}
