import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { States } from './entities/states.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Injectable()
export class StatesService extends TypeOrmCrudService<States> {
  constructor(
    @InjectRepository(States, ColegioDBNameConnection) readonly repo: Repository<States>,
  ) {
    super(repo);
  }
}
