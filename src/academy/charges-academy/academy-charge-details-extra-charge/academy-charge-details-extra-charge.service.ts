import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../../databases/colegiodb.service';
import { Repository } from 'typeorm';
import { AcademyChargeDetailsExtraCharge } from './entities/academy-charge-details-extra-charge.entity';

@Injectable()
export class AcademyChargeDetailsExtraChargeService extends TypeOrmCrudService<AcademyChargeDetailsExtraCharge> {
    constructor(
        @InjectRepository(AcademyChargeDetailsExtraCharge, ColegioDBNameConnection) readonly repo: Repository<AcademyChargeDetailsExtraCharge>,
    ) {
        super(repo);
    }
}
