import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademyInscriptionConcepts } from './entities/academy-inscription-concepts.entity';

@Injectable()
export class AcademyInscriptionConceptsService extends TypeOrmCrudService<AcademyInscriptionConcepts> {
  constructor(
    @InjectRepository(AcademyInscriptionConcepts, 'colegiodb') readonly repo: Repository<AcademyInscriptionConcepts>,
  ) {
    super(repo);
  }
}
