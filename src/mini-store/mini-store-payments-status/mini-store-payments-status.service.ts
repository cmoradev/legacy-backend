import { Injectable } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { MiniStorePaymentStatus } from '../../school-colegio-ingles/subjects/entities/mini-store-payment-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MiniStorePaymentsStatusService extends TypeOrmCrudService<MiniStorePaymentStatus> {
    constructor(
        @InjectRepository(MiniStorePaymentStatus, 'colegiodb') readonly repo: Repository<MiniStorePaymentStatus>,
    ) {
        super(repo);
    }

}
