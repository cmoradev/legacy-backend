import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Periods } from './entities/periods.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class PeriodsService extends TypeOrmCrudService<Periods> {
    constructor(@InjectRepository(Periods, ColegioDBNameConnection)
                private readonly paymentPlanRepository: Repository<Periods>) {
        super(paymentPlanRepository);
    }
}
