import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { SchoolPayment } from './entities/school-payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { Repository } from 'typeorm';
import { IQueryReport } from './interfaces/IQueryReport';
import * as moment from 'moment';

@Injectable()
export class SchoolPaymentsService extends TypeOrmCrudService<SchoolPayment> {
  constructor(
    @InjectRepository(SchoolPayment, ColegioDBNameConnection)
      repo: Repository<SchoolPayment>,
  ) {
    super(repo);
  }

  public async paymentsByStatus(options: IQueryReport) {
    const payments = await this.repo.createQueryBuilder('schoolPayments')
      .leftJoinAndSelect('schoolPayments.inscription', 'inscription')
      .leftJoinAndSelect('inscription.inscripStudent', 'inscripStudent')
      .leftJoinAndSelect('inscription.inscripLevel', 'inscripLevel')
      .leftJoinAndSelect('inscription.inscripGrade', 'inscripGrade')
      .leftJoinAndSelect('inscription.inscripCycle', 'inscripCycle')
      .leftJoinAndSelect('inscription.inscripGroup', 'inscripGroup')
      .leftJoinAndSelect('inscription.inscripCampus', 'branchOffice')
      .where('schoolPayments.isActive = :isActive', { isActive: true });
    if (options.month !== null && options.month !== '' && typeof options.month !== 'undefined') {
      payments.andWhere('schoolPayments.payDate BETWEEN :startDate AND :endDate', {
        startDate: moment(options.month).startOf('month').toDate(),
        endDate: moment(options.month).startOf('month').toDate(),
      });
    }
    if (options.statusPayment !== 0 && options.statusPayment !== '0' && typeof options.statusPayment !== 'undefined') payments.andWhere('schoolPayments.statusPayment = :statusPayment', { statusPayment: options.statusPayment });
    if (options.cycleId !== 0 && options.cycleId !== '0' && typeof options.cycleId !== 'undefined') payments.andWhere('inscripCycle.id = :cycleId', { cycleId: options.cycleId });
    if (options.branchOfficeId !== 0 && options.branchOfficeId !== '0' && typeof options.branchOfficeId !== 'undefined') payments.andWhere('branchOffice.id = :branchOfficeId', { branchOfficeId: options.branchOfficeId });
    if (options.levelId !== 0 && options.levelId !== '0' && typeof options.levelId !== 'undefined') payments.andWhere('inscripLevel.id = :levelId', { levelId: options.levelId });
    if (options.gradeId !== 0 && options.gradeId !== '0' && typeof options.gradeId !== 'undefined') payments.andWhere('inscripGrade.id = :gradeId', { gradeId: options.gradeId });
    await payments.addOrderBy('schoolPayments.statusPayment');
    return payments.getMany();
  }
}
