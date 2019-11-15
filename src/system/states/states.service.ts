import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { States } from './entities/states.entity';

@Injectable()
export class StatesService extends TypeOrmCrudService<States> {
  constructor(
    @InjectRepository(States, 'colegiodb') readonly repo: Repository<States>,
  ) {
    super(repo);
  }
}
