import { Module } from '@nestjs/common';
import { AcademiesModalitiesController } from './academies-modalities.controller';
import { AcademiesModalitiesService } from './academies-modalities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademiesModality } from './entities/academies-modality.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ AcademiesModality ], 'colegiodb') ],
  controllers: [AcademiesModalitiesController],
  providers: [AcademiesModalitiesService],
  exports: [ AcademiesModalitiesService ],
})
export class AcademiesModalitiesModule {}
