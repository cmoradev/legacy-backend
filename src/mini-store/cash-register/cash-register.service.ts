import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CashRegister } from './entities/cash-register.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { Repository } from 'typeorm';

@Injectable()
export class CashRegisterService extends TypeOrmCrudService<CashRegister> {
    constructor(@InjectRepository(CashRegister, ColegioDBNameConnection) cashRegisterRepository: Repository<CashRegister>) {
        super(cashRegisterRepository);
    }
}
