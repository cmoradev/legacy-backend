import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { Repository } from 'typeorm';
import { AcademyChargeDetails } from './entities/academy-charge-details.entity';

@Injectable()
export class AcademyChargeDetailsService extends TypeOrmCrudService<AcademyChargeDetails> {
  constructor(
    @InjectRepository(AcademyChargeDetails, ColegioDBNameConnection) readonly repo: Repository<AcademyChargeDetails>,
  ) {
    super(repo);
  }
}
