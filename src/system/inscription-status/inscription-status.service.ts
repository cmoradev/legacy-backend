import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InscriptionStatus } from './entities/inscription-status.entity';

@Injectable()
export class InscriptionStatusService extends TypeOrmCrudService<InscriptionStatus> {
  constructor(
    @InjectRepository(InscriptionStatus, 'colegiodb') readonly repo: Repository<InscriptionStatus>,
  ) {
    super(repo);
  }
}
