import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademyActivitiesGroup } from './entities/academy-activities-group.entity';

@Injectable()
export class AcademyActivitiesGroupService extends TypeOrmCrudService<AcademyActivitiesGroup> {
  constructor(
    @InjectRepository(AcademyActivitiesGroup, 'colegiodb') readonly repo: Repository<AcademyActivitiesGroup>,
  ) {
    super(repo);
  }
}
