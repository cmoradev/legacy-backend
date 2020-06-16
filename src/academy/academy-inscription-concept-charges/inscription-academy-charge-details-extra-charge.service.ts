import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { Repository } from 'typeorm';
import { AcademyInscriptionChargesEntity } from './entites/academy-inscription-charges.entity';

@Injectable()
export class IncriptionAcademyChargeDetailsExtraChargeService extends TypeOrmCrudService<AcademyInscriptionChargesEntity> {
    constructor(
        @InjectRepository(AcademyInscriptionChargesEntity, ColegioDBNameConnection) readonly repo: Repository<AcademyInscriptionChargesEntity>,
    ) {
        super(repo);
    }
}
