import { Module } from '@nestjs/common';
import { AcademyActivitiesGroupService } from './academy-activities-group.service';
import { AcademyActivitiesGroupController } from './academy-activities-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademyActivitiesGroup } from './entities/academy-activities-group.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Module({
  imports: [TypeOrmModule.forFeature([AcademyActivitiesGroup], ColegioDBNameConnection)],
  providers: [AcademyActivitiesGroupService],
  controllers: [AcademyActivitiesGroupController],
})
export class AcademyActivitiesGroupModule {
}
