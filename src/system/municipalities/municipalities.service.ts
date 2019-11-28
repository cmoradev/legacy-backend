import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Municipalities } from './entities/municipalities.entity';

@Injectable()
export class MunicipalitiesService extends TypeOrmCrudService<Municipalities> {
  constructor(
    @InjectRepository(Municipalities, 'colegiodb') readonly repo: Repository<Municipalities>,
  ) {
    super(repo);
  }
}
