import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Classroom } from './entities/classroom.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { Attendance } from '../inscriptions/interfaces/inscriptions.interface';

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
        return await this.repo.createQueryBuilder('classroom').innerJoinAndSelect('classroom.group', 'group').getMany();
    }
}
