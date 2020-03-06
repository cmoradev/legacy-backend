import { Module } from '@nestjs/common';
import { AcademyInscriptionConceptsService } from './academy-inscription-concepts.service';
import { AcademyInscriptionConceptsController } from './academy-inscription-concepts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademyInscriptionConcepts } from './entities/academy-inscription-concepts.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
  imports: [TypeOrmModule.forFeature([AcademyInscriptionConcepts], ColegioDBNameConnection)],
  exports: [AcademyInscriptionConceptsService],
  providers: [AcademyInscriptionConceptsService],
  controllers: [AcademyInscriptionConceptsController]
})
export class AcademyInscriptionConceptsModule {}
