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
    async updateSignatureCheckIn(idCheckIn: number, fileName: string) {
        const checkIn = await this.checkinRepository.findOne({ id: idCheckIn });
        checkIn.signature = fileName;
        return await this.checkinRepository.save(checkIn);
    }

}
