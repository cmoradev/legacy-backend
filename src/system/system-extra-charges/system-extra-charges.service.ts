import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemExtraCharges } from './entities/system-extra-charges.entity';

@Injectable()
export class SystemExtraChargesService extends TypeOrmCrudService<SystemExtraCharges> {
  constructor(
    @InjectRepository(SystemExtraCharges, 'colegiodb') readonly repo: Repository<SystemExtraCharges>,
  ) {
    super(repo);
  }
}
