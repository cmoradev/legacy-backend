import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { AcademyActivity } from './entities/academy-activity.entity';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { QueryMensualidades } from './types/academyActvities.interface';
import { AcademyActivitiesGroup } from '../academy-activities-group/entities/academy-activities-group.entity';
import { AcademyInscription } from '../academy-inscription/entities/academy-inscription.entity';

@Injectable()
export class AcademyActivitiesService extends TypeOrmCrudService<AcademyActivity> {
    constructor(
        @InjectRepository(AcademyActivity, ColegioDBNameConnection) readonly repo: Repository<AcademyActivity>,
        @InjectRepository(AcademyInscription, ColegioDBNameConnection) readonly repoAcademyInscription: Repository<AcademyInscription>,
    ) {
        super(repo);
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
                'branchOffice.id',
                'branchOffice.name',
                'cycle.id',
                'cycle.name',
            ])
            .where('activities.isActive= :isActive', {
                isActive: true,
            });

        /*
            if (query.activityId !== 0) {
                activities.where('activities.id = :id', {
                    id: query.activityId,
                });
            }
        */

        /*if (query.branchOfficeId !== 0) {
            activities.where('branchOffice.id = :id', {
                id: query.branchOfficeId,
            });
        }

        if (query.cycleId !== 0) {
            activities.where('cycle.id = :id', {
                id: query.cycleId,
            });
        }*/

        const insccripciones = this.repoAcademyInscription.createQueryBuilder('inscripciones');
        return insccripciones.getMany();

    }
}
