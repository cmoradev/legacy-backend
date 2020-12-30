import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { Repository } from 'typeorm';
import { MiniStoreQuotation } from './entities/mini-store-quotation.entity';

@Injectable()
export class MiniStoreQuotationService extends TypeOrmCrudService<MiniStoreQuotation> {
  constructor(
    @InjectRepository(MiniStoreQuotation, ColegioDBNameConnection) readonly repo: Repository<MiniStoreQuotation>,
  ) {
    super(repo);
  }
}
