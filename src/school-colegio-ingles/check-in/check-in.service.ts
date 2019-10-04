import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CheckIn } from './entities/check-in.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import moment = require('moment');
import { Between, Equal } from 'typeorm';

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
    async getCheckInWithStatusInside(gaffete: number) {
        return await this.checkinRepository.find({ guestBadgeCode: gaffete, status: StatusCheckIn.Inside });
    }
    async getStats() {
        const [statsInDating, statsByStatus] = await Promise.all([this.getStatsInDating(), this.getStatsByStatus()]);
        return {
            statsByStatus,
            statsInDating,
        };
        /*return this.checkinRepository.find({  where: {
               createdAt: Between(moment().subtract(2, 'days').toISOString(), moment().toISOString()),
    } , relations: ['department'] });*/
    }
    async getStatsInDating() {
        const promiseCountWithDating = this.checkinRepository.count({ where: { isDating: false } });
        const promiseCountWithoutDating = this.checkinRepository.count({ where: { isDating: true } });
        const [countWithDating, countWithoutDating] = await Promise.all([promiseCountWithDating, promiseCountWithoutDating]);
        return {
            countWithDating,
            countWithoutDating,
        };
    }
    async getStatsByStatus() {
        const promiseCountWithStatusInside = this.checkinRepository.count({ where: { status: StatusCheckIn.Inside } });
        const promiseCountWithStatusOutside = this.checkinRepository.count({ where: { status: StatusCheckIn.Outside } });
        const [countInside, countOutside] = await Promise.all([promiseCountWithStatusInside, promiseCountWithStatusOutside]);
        return {
            countInside,
            countOutside,
        };
    }

}
