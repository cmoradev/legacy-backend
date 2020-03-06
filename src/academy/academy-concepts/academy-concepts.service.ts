import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademyConcepts } from './entities/academy-concepts.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class AcademyConceptsService extends TypeOrmCrudService<AcademyConcepts> {
  constructor(
    @InjectRepository(AcademyConcepts, ColegioDBNameConnection) readonly repo: Repository<AcademyConcepts>,
  ) {
    super(repo);
  }
}
