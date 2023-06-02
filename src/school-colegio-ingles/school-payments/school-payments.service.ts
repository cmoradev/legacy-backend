import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { SchoolPayment } from './entities/school-payment.entity';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { Connection, Repository } from 'typeorm';
import { IQueryReport, IQueryReportConcept } from './interfaces/IQueryReport';
import * as moment from 'moment';
import { IReportConceptRow } from './interfaces/IReportConceptRow.interface';
import { PaymentStatus } from '../../common/enums/PaymentStatus';

@Injectable()
export class SchoolPaymentsService extends TypeOrmCrudService<SchoolPayment> {
  constructor(
    @InjectConnection(ColegioDBNameConnection)
    private connection: Connection,
    @InjectRepository(SchoolPayment, ColegioDBNameConnection)
    public repo: Repository<SchoolPayment>,
  ) {
    super(repo);
  }

  public async softDeleteOne(id: number) {
    const object = await this.findOne(id);
    if (!object) {
      throw new NotFoundException('This entity does not exists')
    }
    return await this.repo.softDelete(id);
  }

  public async softRestoreOne(id: number) {
    const object = await this.repo.findOne({id}, {withDeleted: true});
    if (!object) {
      throw new NotFoundException('This entity does not exists')
    }
    return await this.repo.restore(id);
  }

  public async paymentsByStatus(options: IQueryReport) {
    const payments = await this.repo
      .createQueryBuilder('schoolPayments')
      .leftJoinAndSelect('schoolPayments.inscription', 'inscription')
      .leftJoinAndSelect('inscription.inscripStudent', 'inscripStudent')
      .leftJoinAndSelect('inscription.inscripLevel', 'inscripLevel')
      .leftJoinAndSelect('inscription.inscripGrade', 'inscripGrade')
      .leftJoinAndSelect('inscription.inscripCycle', 'inscripCycle')
      .leftJoinAndSelect('inscription.inscripClassroom', 'inscripClassroom')
      .leftJoinAndSelect('inscription.inscripCampus', 'branchOffice')
      .where('schoolPayments.isActive = :isActive', { isActive: true });
    if (
      options.month !== null &&
      options.month !== '' &&
      typeof options.month !== 'undefined'
    ) {
      payments.andWhere(
        'schoolPayments.payDate BETWEEN :startDate AND :endDate',
        {
          startDate: moment(options.month).startOf('month').toDate(),
          endDate: moment(options.month).endOf('month').toDate(),
        },
      );
    }
    if (
      parseInt(`${options.statusPayment}`) !== 0 &&
      `${options.statusPayment}` !== '0' &&
      typeof options.statusPayment !== 'undefined'
    )
      payments.andWhere('schoolPayments.statusPayment = :statusPayment', {
        statusPayment: options.statusPayment,
      });
    if (
      options.cycleId !== 0 &&
      options.cycleId !== '0' &&
      typeof options.cycleId !== 'undefined'
    )
      payments.andWhere('inscripCycle.id = :cycleId', {
        cycleId: options.cycleId,
      });
    if (
      options.branchOfficeId !== 0 &&
      options.branchOfficeId !== '0' &&
      typeof options.branchOfficeId !== 'undefined'
    )
      payments.andWhere('branchOffice.id = :branchOfficeId', {
        branchOfficeId: options.branchOfficeId,
      });
    if (
      options.levelId !== 0 &&
      options.levelId !== '0' &&
      typeof options.levelId !== 'undefined'
    )
      payments.andWhere('inscripLevel.id = :levelId', {
        levelId: options.levelId,
      });
    if (
      options.gradeId !== 0 &&
      options.gradeId !== '0' &&
      typeof options.gradeId !== 'undefined'
    )
      payments.andWhere('inscripGrade.id = :gradeId', {
        gradeId: options.gradeId,
      });
    await payments.addOrderBy('schoolPayments.statusPayment');
    return payments.getMany();
  }

  public async reportConceptsUpToDate({
    conceptPay,
    cycleId,
    conceptStatus,
    branchOfficeId
  }: IQueryReportConcept): Promise<IReportConceptRow[]> {
    let queryString = `SELECT * FROM vw_status_concepts WHERE conceptPay <= '${conceptPay}' AND cycleId = ${cycleId} AND branchOfficeId = ${branchOfficeId}`;

    if (`${conceptStatus}` === `${PaymentStatus.Debit}`) {
      queryString = `${queryString} AND conceptStatus = ${conceptStatus} AND conceptPaid IS NULL AND inscriptionStatus != '0' AND studentStatus != '0';`;
    } else if (`${conceptStatus}` === `${PaymentStatus.PaiOut}`) {
      queryString = `${queryString} AND (conceptStatus = ${conceptStatus} OR conceptPaid IS NOT NULL);`;
    } else {
      queryString = `${queryString} AND conceptStatus = ${conceptStatus};`;
    }

    try {
      return this.connection.query(queryString);
    } catch (e) {
      throw new NotFoundException(
        `Error in query or conection [${queryString}]`,
      );
    }
  }
}
