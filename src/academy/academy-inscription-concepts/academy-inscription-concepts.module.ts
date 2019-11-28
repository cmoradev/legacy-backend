import { Module } from '@nestjs/common';
import { AcademyInscriptionConceptsService } from './academy-inscription-concepts.service';
import { AcademyInscriptionConceptsController } from './academy-inscription-concepts.controller';

@Module({
  providers: [AcademyInscriptionConceptsService],
  controllers: [AcademyInscriptionConceptsController]
})
export class AcademyInscriptionConceptsModule {}
