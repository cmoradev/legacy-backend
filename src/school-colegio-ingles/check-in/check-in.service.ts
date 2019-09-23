import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CheckIn } from './entities/check-in.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
enum StatusCheckIn {
    Inside = 'Inside',
    Outside = 'Outside',
    NotRecognized = 'NotRecognized',
    Processing = 'Processing',
}

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
    async makeCheckOut(guestBadgeCode: number) {
        const checkIn = await this.checkinRepository.findOneOrFail({  guestBadgeCode, status: StatusCheckIn.Inside });
        checkIn.exitHour = new Date();
        checkIn.status = StatusCheckIn.Outside;
        return await this.checkinRepository.save(checkIn);
    }

}
