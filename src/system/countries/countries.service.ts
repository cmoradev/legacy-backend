import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Injectable()
export class CountriesService extends TypeOrmCrudService<Country> {
  constructor(
    @InjectRepository(Country, ColegioDBNameConnection) readonly repo: Repository<Country>,
  ) {
    super(repo);
  }
}
