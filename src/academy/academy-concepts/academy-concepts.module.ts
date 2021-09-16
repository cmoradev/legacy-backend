import { Module } from '@nestjs/common';
import { AcademyConceptsService } from './academy-concepts.service';
import { AcademyConceptsController } from './academy-concepts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademyConcepts } from './entities/academy-concepts.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
  imports: [TypeOrmModule.forFeature([AcademyConcepts], ColegioDBNameConnection)],
  exports: [AcademyConceptsService],
  providers: [AcademyConceptsService],
  controllers: [AcademyConceptsController],
})
export class AcademyConceptsModule {
}
