import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Classroom } from './entities/classroom.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Injectable()
export class ClassroomsService extends TypeOrmCrudService<Classroom> {
    constructor(
        @InjectRepository(Classroom, ColegioDBNameConnection) readonly repo: Repository<Classroom>,
    ) {
        super(repo);
    }

    public async getClassRoomByLevel(levelId: number, gradeId: number, cycleId: number) {
        return await this.repo.find({
            where: {
                level: {
                    id: levelId,
                },
                grade: {
                    id: gradeId,
                },
                cycle: {
                    id: cycleId,
                },
            },
            order: {
                id: 'ASC',
            },
        });
    }

    async getClassroomWithGroup() {
        return await this.repo.createQueryBuilder('classroom').innerJoinAndSelect('classroom.grade', 'grade').getMany();
    }

    public async softDeleteOne(id: number) {
        const object = await this.findOne(id);
        if (!object) {
            throw new NotFoundException('This entity does not exists');
        }
        return await this.repo.softDelete(id);
    }
}
