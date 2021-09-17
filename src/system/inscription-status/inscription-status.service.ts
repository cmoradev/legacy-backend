import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InscriptionStatus } from './entities/inscription-status.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Injectable()
export class InscriptionStatusService extends TypeOrmCrudService<InscriptionStatus> {
  constructor(
    @InjectRepository(InscriptionStatus, ColegioDBNameConnection) readonly repo: Repository<InscriptionStatus>,
  ) {
    super(repo);
  }
}
