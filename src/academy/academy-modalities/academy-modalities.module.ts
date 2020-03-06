import { Module } from '@nestjs/common';
import { AcademyModalitiesController } from './academy-modalities.controller';
import { AcademyModalitiesService } from './academy-modalities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademiesModality } from './entities/academy-modality.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ AcademiesModality ], ColegioDBNameConnection) ],
  controllers: [AcademyModalitiesController],
  providers: [AcademyModalitiesService],
  exports: [ AcademyModalitiesService ],
})
export class AcademyModalitiesModule {}
