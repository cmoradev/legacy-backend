import { Module } from '@nestjs/common';
import { AcademyInscriptionConceptsService } from './academy-inscription-concepts.service';
import { AcademyInscriptionConceptsController } from './academy-inscription-concepts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademyInscriptionConcepts } from './entities/academy-inscription-concepts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AcademyInscriptionConcepts], 'colegiodb')],
  exports: [AcademyInscriptionConceptsService],
  providers: [AcademyInscriptionConceptsService],
  controllers: [AcademyInscriptionConceptsController]
})
export class AcademyInscriptionConceptsModule {}
