import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cities } from './entities/cities.entity';

@Injectable()
export class CitiesService extends TypeOrmCrudService<Cities> {
  constructor(
    @InjectRepository(Cities, 'colegiodb') readonly repo: Repository<Cities>,
  ) {
    super(repo);
  }
}
