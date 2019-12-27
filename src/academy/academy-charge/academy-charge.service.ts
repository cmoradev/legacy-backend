import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademyCharge } from './entities/academy-charge.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class AcademyChargeService  extends TypeOrmCrudService<AcademyCharge> {
  constructor(
    @InjectRepository(AcademyCharge, ColegioDBNameConnection) readonly repo: Repository<AcademyCharge>,
  ) {
    super(repo);
  }
}
