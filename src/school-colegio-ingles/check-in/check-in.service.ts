import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CheckIn } from './entities/check-in.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CheckInService extends TypeOrmCrudService<CheckIn> {
    constructor(
        @InjectRepository(CheckIn, 'colegiodb')
        readonly checkinRepository: Repository<CheckIn>,
    ) {
        super(checkinRepository);
    }

}
