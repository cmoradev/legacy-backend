import { Module } from '@nestjs/common';
import { AcademyInscriptionExternalService } from './academy-inscription-external.service';
import { AcademyInscriptionExternalController } from './academy-inscription-external.controller';

@Module({
  providers: [AcademyInscriptionExternalService],
  controllers: [AcademyInscriptionExternalController]
})
export class AcademyInscriptionExternalModule {}
