import { Module } from '@nestjs/common';
import { AcademyActivitiesService } from './academy-activities.service';
import { AcademyActivitiesController } from './academy-activities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './entities/academy-activity.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { AcademyInscription } from '../academy-inscription/entities/academy-inscription.entity';
import { AcademyInscriptionModule } from '../academy-inscription/academy-inscription.module';
import { CyclesModule } from '../../school-colegio-ingles/cycles/cycles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Activity,
      AcademyInscription,
    ], ColegioDBNameConnection),
    AcademyInscriptionModule,
  ],
  exports: [AcademyActivitiesService],
  providers: [AcademyActivitiesService],
  controllers: [AcademyActivitiesController],
})
export class AcademyActivitiesModule {
}
