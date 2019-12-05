import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemConceptsType } from './entities/system-concepts-type.entity';

@Injectable()
export class SystemConceptsTypeService extends TypeOrmCrudService<SystemConceptsType> {
  constructor(
    @InjectRepository(SystemConceptsType, 'colegiodb') readonly repo: Repository<SystemConceptsType>,
  ) {
    super(repo);
  }

}
