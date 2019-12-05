import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemTypeExtraCharges } from './entities/system-type-extra-charges.entity';

@Injectable()
export class SystemTypeExtraChargesService extends TypeOrmCrudService<SystemTypeExtraCharges> {
  constructor(
    @InjectRepository(SystemTypeExtraCharges, 'colegiodb') readonly repo: Repository<SystemTypeExtraCharges>,
  ) {
    super(repo);
  }
}
