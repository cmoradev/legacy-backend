import { Module } from '@nestjs/common';
import { AcademyActivitiesGroupService } from './academy-activities-group.service';
import { AcademyActivitiesGroupController } from './academy-activities-group.controller';

@Module({
  providers: [AcademyActivitiesGroupService],
  controllers: [AcademyActivitiesGroupController]
})
export class AcademyActivitiesGroupModule {}
