import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { AcademyActivity } from './entities/academy-activity.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { QueryMensualidades } from './types/academyActvities.interface';
import { AcademyInscription } from '../academy-inscription/entities/academy-inscription.entity';
import { AcademyInscriptionService } from '../academy-inscription/academy-inscription.service';
import { VwAcaGroupType } from './types/vw.aca.group.type';
import { InscriptionStatus } from '../../common/enums/PaymentStatus';
import { TypeStudent } from '../../school-colegio-ingles/students/interface/studentsSchool.interface';

// Incluido |
const estado = {0: 'I', 1: 'A', 2: 'P', 3: 'Cond', 6: 'N/I'};

@Injectable()
export class AcademyActivitiesService extends TypeOrmCrudService<AcademyActivity> {
    constructor(
        @InjectConnection(ColegioDBNameConnection) private readonly _connection: Connection,
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
        const object = await this.repo.findOne({id}, {withDeleted: true});
        if (!object) {
            throw new NotFoundException('This entity does not exists')
        }
        return await this.repo.restore(id);
    }

    async monthsPayments(params: QueryMensualidades): Promise<VwAcaGroupType[]> {
        let query: string = `SELECT *
                             FROM vw_aca_groups
                             WHERE TRUE`;

        if (params.activityId !== 0) {
            query = `${query} AND a_id = ${params.activityId}`
        }

        if (params.ActivityGroupId !== 0) {
            query = `${query} AND g_id = ${params.ActivityGroupId}`
        }

        if (params.branchOfficeId !== 0) {
            query = `${query} AND p_id = ${params.branchOfficeId}`
        }

        if (params.cycleId !== 0) {
            query = `${query} AND c_id = ${params.cycleId}`
        }

        const data: VwAcaGroupType[] = await this._connection.query(query);

        const ids: number[] = data.map(value => value.g_id)

        const currentInscriptions = await this.serviceInscriptionAc.inscripciones({
            month: params.month,
            status: [InscriptionStatus.SignedUp],
            groupId: ids,
        });

        return data.map((row): VwAcaGroupType => {
            const students = []
            const currentInscriptionsByGroup = currentInscriptions.filter(value => value.academyGroup.id === row.g_id)

            if (!!currentInscriptionsByGroup.length) {
                for (const academyInscription of currentInscriptionsByGroup) {
                    let paymentState = 0;
                    let date: any = '';
                    if (academyInscription.isIncluded) {
                        paymentState = 0;
                        date = 'sin fecha';
                    } else {
                        if (academyInscription.concepts.length > 0) {
                            paymentState = academyInscription.concepts[0].paymentStatus;
                            date = academyInscription.concepts[0].payDate;
                        } else {
                            paymentState = 6;
                            date = 'sin fecha';
                        }
                    }

                    if (estado[paymentState] != 'N/I') {
                        students.push({
                            id: academyInscription?.student?.id,
                            matricula: academyInscription?.student?.matricula,
                            name: academyInscription?.student?.name + ' ' + academyInscription?.student?.lastNameFather + ' ' + academyInscription?.student?.lastNameMother,
                            type: academyInscription.student.typeStudent === TypeStudent.student ? 'Alumno' : 'Externo',
                            level: academyInscription?.schoolLevel?.name ?? '',
                            grade: academyInscription?.schoolGrade?.name ?? '',
                            group: academyInscription?.schoolGroup?.name ?? '',
                            state: estado[paymentState],
                            date,
                        });
                    }
                }
            }

            return {
                ...row,
                students
            };
        })

    }
}
