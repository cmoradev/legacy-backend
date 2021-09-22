import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemExtraCharges } from './entities/system-extra-charges.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Injectable()
export class SystemExtraChargesService extends TypeOrmCrudService<SystemExtraCharges> {
  constructor(
    @InjectRepository(SystemExtraCharges, ColegioDBNameConnection) readonly repo: Repository<SystemExtraCharges>,
  ) {
    super(repo);
  }
}
