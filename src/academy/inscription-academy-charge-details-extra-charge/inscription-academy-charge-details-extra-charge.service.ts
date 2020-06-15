import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { Repository } from 'typeorm';
import { InscriptionAcademyChargeDetailsExtraChargeEntity } from './entites/inscription-academy-charge-details-extra-charge.entity';

@Injectable()
export class IncriptionAcademyChargeDetailsExtraChargeService extends TypeOrmCrudService<InscriptionAcademyChargeDetailsExtraChargeEntity> {
    constructor(
        @InjectRepository(InscriptionAcademyChargeDetailsExtraChargeEntity, ColegioDBNameConnection) readonly repo: Repository<InscriptionAcademyChargeDetailsExtraChargeEntity>,
    ) {
        super(repo);
    }
}
