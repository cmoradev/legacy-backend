import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CheckIn } from './entities/check-in.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

import { Department } from '../departments/entities/department.entity';
import { getDay, getHour, getMonth, getWeek, getYear, TypeFilterDate, DateQueryObject } from '../../common/time-utils';
import moment = require('moment');

enum StatusCheckIn {
    Inside = 'Inside',
    Outside = 'Outside',
    NotRecognized = 'NotRecognized',
    Processing = 'Processing',
}

interface StatsByDepartments {
    id: string;
    name: string;
    quantity: string;
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

    async makeCheckOut(guestBadgeCode: number) {
        const checkIn = await this.checkinRepository.findOneOrFail({ guestBadgeCode, status: StatusCheckIn.Inside });
        checkIn.exitHour = new Date();
        checkIn.status = StatusCheckIn.Outside;
        return await this.checkinRepository.save(checkIn);
    }

    async getCheckInWithStatusInside(gaffete: number) {
        return await this.checkinRepository.find({ guestBadgeCode: gaffete, status: StatusCheckIn.Inside });
    }

    getDateTime({ filter }: { filter: TypeFilterDate }): DateQueryObject {
        switch (filter) {
            case  TypeFilterDate.Day:
                return getDay();
            case  TypeFilterDate.Month:
                return getMonth();
            case  TypeFilterDate.Week:
                return getWeek();
            case  TypeFilterDate.Year:
                return getYear();
            case TypeFilterDate.Hour:
                return getHour();
            case TypeFilterDate.Total:
                return null;
            default:
                return null;
        }
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
                      createdAt: Between(
                        dates.dateStart.toISOString(),
                        dates.dateEnd.toISOString()),
                  },
            });
    }

    getStatsByDepartment(dates: DateQueryObject) {
        if (!dates) {
            return this.departmentRepository.createQueryBuilder('department')
              .leftJoinAndSelect('department.inputRecords', 'checkin', 'checkin.department = department.id')
              .select('department.id', 'id')
              .addSelect('department.name', 'name')
              .addSelect('COUNT(*) AS quantity')
              .groupBy('department.id')
              .getRawMany();
        }
        return this.departmentRepository.createQueryBuilder('department')
          .leftJoinAndSelect('department.inputRecords', 'checkin', 'checkin.department = department.id')
          .select('department.id', 'id')
          .addSelect('department.name', 'name')
          .addSelect('COUNT(*) AS quantity')
          .where('checkin.entryHour BETWEEN :startDate AND :endDate', {
              startDate: dates.dateStart.toDate().toISOString(),
              endDate: dates.dateEnd.toDate().toISOString(),
          })
          .groupBy('department.id')
          .getRawMany();
    }

    getStatsInDating(dates: DateQueryObject) {
        if (!dates) {
            return this.checkinRepository.createQueryBuilder('checkIn')
              .select('checkIn.id', 'id')
              .select('checkIn.isDating', 'isDating')
              .addSelect('COUNT(*) AS quantity')
              .groupBy('checkIn.isDating')
              .getRawMany();
        }
        return this.checkinRepository.createQueryBuilder('checkIn')
          .select('checkIn.id', 'id')
          .select('checkIn.isDating', 'isDating')
          .addSelect('COUNT(*) AS quantity')
          .where('checkIn.entryHour BETWEEN :startDate AND :endDate', {
              startDate: dates.dateStart.toDate().toISOString(),
              endDate: dates.dateEnd.toDate().toISOString(),
          })
          .groupBy('checkIn.isDating')
          .getRawMany();
    }

    getStatsByStatus(dates: DateQueryObject) {
        if (!dates) {
            return this.checkinRepository.createQueryBuilder('checkIn')
              .select('checkIn.id', 'id')
              .select('checkIn.status', 'status')
              .addSelect('COUNT(*) AS quantity')
              .groupBy('checkIn.status')
              .getRawMany();
        }
        return this.checkinRepository.createQueryBuilder('checkIn')
          .select('checkIn.id', 'id')
          .select('checkIn.status', 'status')
          .addSelect('COUNT(*) AS quantity')
          .where('checkIn.entryHour BETWEEN :startDate AND :endDate', {
              startDate: dates.dateStart.toDate().toISOString(),
              endDate: dates.dateEnd.toDate().toISOString(),
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
                where: { createdAt: Between(
                      dates.dateStart.toISOString(),
                      dates.dateEnd.toISOString()) },
                order: {
                    entryHour: 'DESC',
                },
                relations: ['department'],
                take: limit,
            });
    }

}
