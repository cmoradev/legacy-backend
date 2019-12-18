import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademyInscription } from './entities/academy-inscription.entity';

@Injectable()
export class AcademyInscriptionService  extends TypeOrmCrudService<AcademyInscription> {
  constructor(
    @InjectRepository(AcademyInscription, 'colegiodb') readonly repo: Repository<AcademyInscription>,
  ) {
    super(repo);
  }
}
