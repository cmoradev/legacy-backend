import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Grade } from './entities/grade.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
import { Group } from '../groups/entities/group.entity';
import { Classroom } from '../classrooms/entities/classroom.entity';
import { Inscription } from '../inscriptions/entities/inscription.entity';

@Injectable()
export class GradesService extends TypeOrmCrudService<Grade> {
    constructor(
        @InjectRepository(Grade, ColegioDBNameConnection) readonly repo: Repository<Grade>,
        @InjectRepository(Classroom, ColegioDBNameConnection) readonly classroomRepo: Repository<Classroom>,
        @InjectRepository(Inscription, ColegioDBNameConnection) readonly inscriptionRepo: Repository<Inscription>,
    ) {
        super(repo);
    }

    public async softDeleteOne(id: number) {
        const object = await this.findOne(id);
        if (!object) {
            throw new NotFoundException('This entity does not exists');
        }

        const [
            classrooms,
            inscriptions,
        ] = await Promise.all([
            this.classroomRepo.count({ where: { grade: { id } } }),
            this.inscriptionRepo.count({ where: { inscripGrade: { id } } }),
        ]);

        if (classrooms || inscriptions ) {
            throw new BadRequestException(
                'No se puede eliminar el grado porque tiene registros relacionados'
            );
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

    async getGradesWithLevel() {
        return await this.repo.createQueryBuilder('grade').innerJoinAndSelect('grade.level', 'level').getMany();
    }
}
