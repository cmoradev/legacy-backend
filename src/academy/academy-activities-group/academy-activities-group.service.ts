import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademyActivitiesGroup } from './entities/academy-activities-group.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class AcademyActivitiesGroupService extends TypeOrmCrudService<AcademyActivitiesGroup> {
  constructor(
    @InjectRepository(AcademyActivitiesGroup, ColegioDBNameConnection) readonly repo: Repository<AcademyActivitiesGroup>,
  ) {
    super(repo);
  }
}
