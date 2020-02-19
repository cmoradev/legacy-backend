import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { Repository } from 'typeorm';
import { AcademyChargeSurcharges } from './entities/academy-charge-surcharges.entity';

@Injectable()
export class AcademyChargeSurchargesService extends TypeOrmCrudService<AcademyChargeSurcharges> {
  constructor(
    @InjectRepository(AcademyChargeSurcharges, ColegioDBNameConnection) readonly repo: Repository<AcademyChargeSurcharges>,
  ) {
    super(repo);
  }
}
