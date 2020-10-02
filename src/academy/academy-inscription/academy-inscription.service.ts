import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademyInscription } from './entities/academy-inscription.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import * as moment from 'moment';
import { AcademyInscriptionConcepts } from '../academy-inscription-concepts/entities/academy-inscription-concepts.entity';
import { InscriptionStatus } from '../../common/enums/PaymentStatus';
import { BranchOffice } from '../../system/branch-office/entities/branch-office.entity';

@Injectable()
export class AcademyInscriptionService extends TypeOrmCrudService<AcademyInscription> {
  constructor(
    @InjectRepository(AcademyInscription, ColegioDBNameConnection)
    readonly repo: Repository<AcademyInscription>,
  ) {
    super(repo);
  }

  async inscripciones(query: { month: any; groupId?: number; status?: InscriptionStatus, ciclyId?: number; branchOfficeId?: number }): Promise<AcademyInscription[]> {
    const insccripciones = this.repo.createQueryBuilder('inscripcion')
      .leftJoinAndSelect('inscripcion.academyGroup', 'academyGroup')
      .leftJoinAndSelect('inscripcion.student', 'student')
      .leftJoinAndSelect('inscripcion.inscriptionCampus', 'inscriptionCampus', query.branchOfficeId ? 'inscriptionCampus.id=' + query.branchOfficeId : null)
      .leftJoinAndSelect('inscripcion.cycle', 'cycle', query.ciclyId ? 'cycle.id=' + query.ciclyId : null)
      .leftJoinAndSelect('inscripcion.schoolLevel', 'schoolLevel')
      .leftJoinAndSelect('inscripcion.schoolGrade', 'schoolGrade')
      .leftJoinAndSelect('inscripcion.schoolGroup', 'schoolGroup')
      .leftJoinAndSelect('inscripcion.concepts', 'concepts',
        'concepts.payDate BETWEEN :startDate AND :endDate AND concepts.id_concepto_cobro = :idT OR concepts.id_concepto_cobro = :idR', {
          startDate: moment(query.month).startOf('month').toDate(),
          endDate: moment(query.month).endOf('month').toDate(),
          idT: 2,
          idR: 5,
        })
      .leftJoinAndSelect((qb) => {
          return qb.from(AcademyInscriptionConcepts, 'conceptsQuery');
        },
        'conceptsQuery', 'conceptsQuery.acInscriptionId = inscripcion.id');
    if (query.status) {
      insccripciones.where('inscripcion.inscriptionStatus = :status', {
        status: query.status,
      });
    }
    if (query.groupId) {

      insccripciones.andWhere('academyGroup.id = :academyGroupId', {
        academyGroupId: query.groupId,
      });
    }

    return await insccripciones.getMany();
  }
}
