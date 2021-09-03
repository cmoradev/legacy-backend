import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademyActivity } from './entities/academy-activity.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { QueryMensualidades, QueryResultMoths } from './types/academyActvities.interface';
import { AcademyInscription } from '../academy-inscription/entities/academy-inscription.entity';
import { TypeStudent } from '../../school-colegio-ingles/students/interface/studentsSchool.interface';
import { AcademyInscriptionService } from '../academy-inscription/academy-inscription.service';
import { InscriptionStatus } from '../../common/enums/PaymentStatus';

@Injectable()
export class AcademyActivitiesService extends TypeOrmCrudService<AcademyActivity> {
  constructor(
    @InjectRepository(AcademyActivity, ColegioDBNameConnection) readonly repo: Repository<AcademyActivity>,
    @InjectRepository(AcademyInscription, ColegioDBNameConnection) readonly repoAcademyInscription: Repository<AcademyInscription>,
    readonly serviceInscriptionAc: AcademyInscriptionService,
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
    const object = await this.repo.findOne({ id }, {withDeleted: true});
    if (!object) {
      throw new NotFoundException('This entity does not exists')
    }
    return await this.repo.restore(id);
  }

  async monthsPayments(query: QueryMensualidades) {
    const activities = this.repo.createQueryBuilder('activities')
      .leftJoinAndSelect('activities.academyActivityGroups', 'group')
      .leftJoinAndSelect('group.academyGroupCampus', 'branchOffice')
      .leftJoinAndSelect('group.academyGroupCycle', 'cycle')
      .select([
        'activities.id',
        'activities.name',
        'group.id',
        'group.name',
        'group.schedule',
        'group.isActive',
        'branchOffice.id',
        'branchOffice.name',
        'cycle.id',
        'cycle.name',
      ])
      .where('activities.isActive= :isActive', {
        isActive: true,
      }).where('group.isActive= :isActive', {
      isActive: true, });

    if (query.activityId !== 0 && query.activityId !== '0') {
      activities.andWhere('activities.id = :activityId', {
        activityId: query.activityId,
      });
    }

    if (query.ActivityGroupId !== 0 && query.ActivityGroupId !== '0') {
      activities.andWhere('group.id = :groupId', {
        groupId: query.ActivityGroupId,
      });
    }


    if (query.branchOfficeId !== 0 && query.branchOfficeId !== '0') {
      activities.andWhere('branchOffice.id = :branchOfficeId', {
        branchOfficeId: query.branchOfficeId,
      });
    }

    if (query.cycleId !== 0 && query.cycleId !== '0') {
      activities.andWhere('cycle.id = :cycleId', {
        cycleId: query.cycleId,
      });
    }
    const activityResult = await activities.getMany();
    let i = 0;
    for (const activity of activityResult) {
      let k = 0;
      for (const group of activity.academyActivityGroups) {
        const insccriptions = await this.serviceInscriptionAc.inscripciones({
          month: query.month,
          status: InscriptionStatus.SignedUp,
          groupId: group.id,
        });
        const estado = { 0: 'I', 1: 'A', 2: 'P', 3: 'Cond', 6: 'N/I' };

        if (insccriptions && insccriptions.length > 0) {
          // @ts-ignore
          activityResult[i].academyActivityGroups[k].students = [];
          for (const insccription of insccriptions) {
            let estadopago = 0;
            let fecha: any = '';
            if (insccription.isIncluded) {
              estadopago = 0;
              fecha = 'sin fecha';
            } else {
              if (insccription.concepts && insccription.concepts.length > 0) {
                estadopago = insccription.concepts[0].paymentStatus;
                fecha = insccription.concepts[0].payDate;
              } else {
                estadopago = 6;
                fecha = 'sin fecha';
              }
            }
            // @ts-ignore
            activityResult[i].academyActivityGroups[k].students.push({
              'id': insccription.student.id,
              'matricula': insccription.student.matricula,
              'name': insccription.student.name + ' ' + insccription.student.lastNameFather + ' ' + insccription.student.lastNameMother,
              'type': insccription.student.typeStudent === TypeStudent.student ? 'Alumno' : 'Externo',
              'level': insccription?.schoolLevel?.name ?? '',
              'grade': insccription?.schoolGrade?.name ?? '',
              'group': insccription?.schoolGroup?.name ?? '',
              'state': estado[estadopago],
              'date': fecha,
            });

          }
        } else {
          // @ts-ignore
          activityResult[i].academyActivityGroups[k].students = [];
        }
        k++;
      }
      i++;
    }

    return activityResult as unknown as QueryResultMoths[];

  }
}
