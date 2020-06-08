import { Module } from '@nestjs/common';
import { AcademyActivitiesService } from './academy-activities.service';
import { AcademyActivitiesController } from './academy-activities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademyActivity } from './entities/academy-activity.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { AcademyInscription } from '../academy-inscription/entities/academy-inscription.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            AcademyActivity,
            AcademyInscription,
        ], ColegioDBNameConnection),
    ],
    exports: [AcademyActivitiesService],
    providers: [AcademyActivitiesService],
    controllers: [AcademyActivitiesController],
})
export class AcademyActivitiesModule {
}
