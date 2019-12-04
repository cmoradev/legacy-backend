import { Module } from '@nestjs/common';
import { AcademyActivitiesGroupService } from './academy-activities-group.service';
import { AcademyActivitiesGroupController } from './academy-activities-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademyActivitiesGroup } from './entities/academy-activities-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AcademyActivitiesGroup], 'colegiodb')],
  providers: [AcademyActivitiesGroupService],
  controllers: [AcademyActivitiesGroupController],
})
export class AcademyActivitiesGroupModule {
}
