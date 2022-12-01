import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademyInscription } from './entities/academy-inscription.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import * as moment from 'moment';
import { AcademyInscriptionConcepts } from '../academy-inscription-concepts/entities/academy-inscription-concepts.entity';
import { InscriptionStatus } from '../../common/enums/PaymentStatus';

@Injectable()
export class AcademyInscriptionService extends TypeOrmCrudService<AcademyInscription> {
    constructor(
        @InjectRepository(AcademyInscription, ColegioDBNameConnection)
        readonly repo: Repository<AcademyInscription>,
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
        const object = await this.repo.findOne({id}, {withDeleted: true});
        if (!object) {
            throw new NotFoundException('This entity does not exists');
        }
        return await this.repo.restore(id);
    }

    async inscripciones(query: { month: any; groupId?: number[]; status?: InscriptionStatus[], ciclyId?: number; branchOfficeId?: number }): Promise<AcademyInscription[]> {
        if (!query.groupId.length) return []

        const insccripciones = this.repo.createQueryBuilder('i')
            .leftJoinAndSelect('i.academyGroup', 'academyGroup')
            .leftJoinAndSelect('i.student', 'student')
            .leftJoinAndSelect('i.inscriptionCampus', 'inscriptionCampus')
            .leftJoinAndSelect('i.cycle', 'cycle')
            .leftJoinAndSelect('i.schoolLevel', 'schoolLevel')
            .leftJoinAndSelect('i.schoolGrade', 'schoolGrade')
            .leftJoinAndSelect('i.schoolGroup', 'schoolGroup')
            .leftJoinAndSelect('i.concepts', 'concepts',
                'concepts.payDate BETWEEN :startDate AND :endDate AND concepts.id_concepto_cobro = :idT OR concepts.id_concepto_cobro = :idR', {
                    startDate: moment(query.month).startOf('month').toDate(),
                    endDate: moment(query.month).endOf('month').toDate(),
                    idT: 2,
                    idR: 5,
                })
            .leftJoinAndSelect((qb) => {
                    return qb.from(AcademyInscriptionConcepts, 'conceptsQuery');
                },
                'conceptsQuery', 'conceptsQuery.acInscriptionId = i.id');

        if (query.status) {
            insccripciones.where('i.inscriptionStatus IN (:...status)', {
                status: query.status,
            });
        }

        if (query.groupId) {
            insccripciones.andWhere('academyGroup.id IN (:...groupsId)', {
                groupsId: query.groupId,
            });
        }

        return await insccripciones.getMany();
    }
}
