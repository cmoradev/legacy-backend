import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CheckIn } from './entities/check-in.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

import { Department } from '../../system/departments/entities/department.entity';
import { DateQueryObject } from '../../common/time-utils';

export enum StatusCheckIn {
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
      @InjectRepository(Department, 'colegiodb')
      readonly departmentRepository: Repository<Department>,
    ) {
        super(checkinRepository);
    }

    async updateSignatureCheckIn(idCheckIn: number, fileName: string) {
        const checkIn = await this.checkinRepository.findOne({ id: idCheckIn });
        checkIn.signature = fileName;
        return await this.checkinRepository.save(checkIn);
    }

    async makeCheckOut(guestBadgeCode: string) {
        const checkIn = await this.checkinRepository.findOneOrFail({ guestBadgeCode, status: StatusCheckIn.Inside });
        checkIn.exitHour = new Date();
        checkIn.status = StatusCheckIn.Outside;
        return await this.checkinRepository.save(checkIn);
    }

    async getCheckInWithStatusInside(gaffete: string) {
        return await this.checkinRepository.find({ guestBadgeCode: gaffete, status: StatusCheckIn.Inside });
    }

    getStatsTotalCheckIn(dates: DateQueryObject) {
        if (!dates) {
            return this.checkinRepository
              .count(
                {});
        }
        return this.checkinRepository
          .count(
            {
                where:
                  {
                      entryHour: Between(
                        dates.dateStart.toDate(),
                        dates.dateEnd.toDate()),
                  },
            });
    }

    getStatsByDepartment(dates: DateQueryObject) {
        if (!dates) {
            return this.departmentRepository.createQueryBuilder('department')
              .leftJoinAndSelect('department.inputRecords', 'checkin', 'checkin.department = department.id')
              .select('department.id', 'id')
              .addSelect('department.name', 'name')
              .addSelect('COUNT(checkin.id) AS quantity')
              .groupBy('department.id')
              .getRawMany();
        }
        return this.departmentRepository.createQueryBuilder('department')
          .leftJoinAndSelect('department.inputRecords', 'checkin', 'checkin.department = department.id')
          .select('department.id', 'id')
          .addSelect('department.name', 'name')
          .addSelect('COUNT(checkin.id) AS quantity')
          .where('checkin.entryHour BETWEEN :startDate AND :endDate', {
              startDate: dates.dateStart.toDate(),
              endDate: dates.dateEnd.toDate(),
          })
          .groupBy('department.id')
          .getRawMany();
    }

    getStatsInDating(dates: DateQueryObject) {
        if (!dates) {
            return this.checkinRepository.createQueryBuilder('checkIn')
              .select('checkIn.isDating', 'isDating')
              .addSelect('COUNT(isDating) AS quantity')
              .groupBy('checkIn.isDating')
              .getRawMany();
        }
        return this.checkinRepository.createQueryBuilder('checkIn')
          .select('checkIn.isDating', 'isDating')
          .addSelect('COUNT(isDating) AS quantity')
          .where('checkIn.entryHour BETWEEN :startDate AND :endDate', {
              startDate: dates.dateStart.toDate(),
              endDate: dates.dateEnd.toDate(),
          })
          .groupBy('checkIn.isDating')
          .getRawMany();
    }

    getStatsByStatus(dates: DateQueryObject) {
        if (!dates) {
            return this.checkinRepository.createQueryBuilder('checkIn')
              .select('checkIn.status', 'status')
              .addSelect('COUNT(checkIn.status) AS quantity')
              .groupBy('checkIn.status')
              .getRawMany();
        }
        return this.checkinRepository.createQueryBuilder('checkIn')
          .select('checkIn.status', 'status')
          .addSelect('COUNT(checkIn.status) AS quantity')
          .where('checkIn.entryHour BETWEEN :startDate AND :endDate', {
              startDate: dates.dateStart.toDate(),
              endDate: dates.dateEnd.toDate(),
          })
          .groupBy('checkIn.status')
          .getRawMany();
    }

    getPeopleByStatus(dates: DateQueryObject, limit: number = 5) {
        if (!dates) {
            return this.checkinRepository.find({ select: [ 'id', 'name', 'entryHour', 'status', 'guestBadgeCode', 'department'], order: {
                    entryHour: 'DESC',
                }, take: limit, relations: ['department'] });
        }
        return this.checkinRepository
          .find(
            {
                select: [ 'id', 'name', 'entryHour', 'status', 'guestBadgeCode', 'department'],
                where: { entryHour: Between(
                      dates.dateStart.toDate(),
                      dates.dateEnd.toDate()) },
                order: {
                    entryHour: 'DESC',
                },
                relations: ['department'],
                take: limit,
            });
    }

}
