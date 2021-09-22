import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cities } from './entities/cities.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Injectable()
export class CitiesService extends TypeOrmCrudService<Cities> {
  constructor(
    @InjectRepository(Cities, ColegioDBNameConnection) readonly repo: Repository<Cities>,
  ) {
    super(repo);
  }
}
