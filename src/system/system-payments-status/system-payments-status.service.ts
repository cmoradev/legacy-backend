import { Injectable } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { SystemPaymentStatus } from './entities/system-payment-status.entity';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class SystemPaymentsStatusService extends TypeOrmCrudService<SystemPaymentStatus> {
    constructor(
        @InjectRepository(SystemPaymentStatus, ColegioDBNameConnection) readonly repo: Repository<SystemPaymentStatus>,
    ) {
        super(repo);
    }

}
