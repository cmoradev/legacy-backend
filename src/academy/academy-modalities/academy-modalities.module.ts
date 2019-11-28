import { Module } from '@nestjs/common';
import { AcademyModalitiesController } from './academy-modalities.controller';
import { AcademyModalitiesService } from './academy-modalities.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademiesModality } from './entities/academy-modality.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([ AcademiesModality ], 'colegiodb') ],
  controllers: [AcademyModalitiesController],
  providers: [AcademyModalitiesService],
  exports: [ AcademyModalitiesService ],
})
export class AcademyModalitiesModule {}
