import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { AcademyInscriptionConcepts } from './entities/academy-inscription-concepts.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import * as moment from 'moment';
import {
  IAcademyQueryReport,
  IAcademyQueryReportConcept,
  IAcademyReportConceptRow,
} from './interfaces/IQueryReport';
import { PaymentStatus } from '../../common/enums/PaymentStatus';

@Injectable()
export class AcademyInscriptionConceptsService extends TypeOrmCrudService<
  AcademyInscriptionConcepts
> {
  constructor(
    @InjectRepository(AcademyInscriptionConcepts, ColegioDBNameConnection)
    readonly repo: Repository<AcademyInscriptionConcepts>,
    @InjectConnection(ColegioDBNameConnection)
    private connection: Connection,
  ) {
    super(repo);
  }

  public async softDeleteOne(id: number) {
    const object = await this.findOne(id);
    if (!object) {
      throw new NotFoundException('This entity does not exists');
    }
    return await this.repo.softDelete(id);
  }

  public async softRestoreOne(id: number) {
    const object = await this.repo.findOne({ id }, { withDeleted: true });
    if (!object) {
      throw new NotFoundException('This entity does not exists');
    }
    return await this.repo.restore(id);
  }

  public async paymentsByStatus(options: IAcademyQueryReport) {
    const payments = this.repo
      .createQueryBuilder('academyInscriptionConcepts')
      .leftJoinAndSelect(
        'academyInscriptionConcepts.acInscription',
        'inscription',
      )
      .leftJoinAndSelect('inscription.student', 'student')
      .leftJoinAndSelect(
        'academyInscriptionConcepts.acInsConActivity',
        'academia',
      )
      .leftJoinAndSelect('inscription.academyGroup', 'group')
      .leftJoinAndSelect('inscription.inscriptionCampus', 'branchOffice')
      .leftJoinAndSelect('inscription.cycle', 'cycle')
      .where('academyInscriptionConcepts.isActive = :isActive', {
        isActive: true,
      });
    if (
      options.month !== null &&
      options.month !== '' &&
      typeof options.month !== 'undefined'
    ) {
      payments.andWhere(
        'academyInscriptionConcepts.payDate BETWEEN :startDate AND :endDate',
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
      payments.andWhere(
        'academyInscriptionConcepts.paymentStatus = :statusPayment',
        {
          statusPayment: options.statusPayment,
        },
      );
    if (
      options.cycleId !== 0 &&
      options.cycleId !== '0' &&
      typeof options.cycleId !== 'undefined'
    )
      payments.andWhere('cycle.id = :cycleId', {
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
      options.academyId !== 0 &&
      options.academyId !== '0' &&
      typeof options.academyId !== 'undefined'
    )
      payments.andWhere('academia.id = :academyId', {
        academyId: options.academyId,
      });
    if (
      options.groupId !== 0 &&
      options.groupId !== '0' &&
      typeof options.groupId !== 'undefined'
    )
      payments.andWhere('group.id = :groupId', {
        groupId: options.groupId,
      });
    payments.addOrderBy('academyInscriptionConcepts.paymentStatus');
    return payments.getMany();
  }

  public async reportConceptsUpToDate({
    conceptPay,
    cycleId,
    conceptStatus,
    branchOfficeId,
    academyId
  }: IAcademyQueryReportConcept): Promise<IAcademyReportConceptRow[]> {
    let queryString = `SELECT * FROM vw_aca_status_concepts WHERE conceptPay <= '${conceptPay}' AND cycleId = ${cycleId} AND branchOfficeId = ${branchOfficeId}`;
    if (
      academyId !== 0 &&
      academyId !== '0' &&
      typeof academyId !== 'undefined'
    )
    queryString = `${queryString} AND academyId = ${academyId}`;

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
