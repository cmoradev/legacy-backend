import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { Repository } from 'typeorm';
import { AcademyInscriptionConceptCharges } from './entites/academy-inscription-concept-charges.entity';

@Injectable()
export class IncriptionAcademyChargeDetailsExtraChargeService extends TypeOrmCrudService<AcademyInscriptionConceptCharges> {
    constructor(
        @InjectRepository(AcademyInscriptionConceptCharges, ColegioDBNameConnection) readonly repo: Repository<AcademyInscriptionConceptCharges>,
    ) {
        super(repo);
    }
}
