import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { Repository } from 'typeorm';
import { AcademyChargeDiscounts } from './entities/academy-charge-discounts.entity';

@Injectable()
export class AcademyChargeDiscountsService extends TypeOrmCrudService<AcademyChargeDiscounts> {
  constructor(
    @InjectRepository(AcademyChargeDiscounts, ColegioDBNameConnection) readonly repo: Repository<AcademyChargeDiscounts>,
  ) {
    super(repo);
  }
}
