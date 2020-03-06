import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademyActivity } from './entities/academy-activity.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class AcademyActivitiesService extends TypeOrmCrudService<AcademyActivity> {
  constructor(
    @InjectRepository(AcademyActivity, ColegioDBNameConnection) readonly repo: Repository<AcademyActivity>,
  ) {
    super(repo);
  }
}
