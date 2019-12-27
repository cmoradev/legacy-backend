import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { Repository } from 'typeorm';
import { AcademyChargeWayOfPaying } from './entities/academy-charge-way-of-paying.entity';

@Injectable()
export class AcademyChargeWayOfPayingService  extends TypeOrmCrudService<AcademyChargeWayOfPaying> {
  constructor(
    @InjectRepository(AcademyChargeWayOfPaying, ColegioDBNameConnection) readonly repo: Repository<AcademyChargeWayOfPaying>,
  ) {
    super(repo);
  }
}
