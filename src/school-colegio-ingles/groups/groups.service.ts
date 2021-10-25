import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Group } from './entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Injectable()
export class GroupsService extends TypeOrmCrudService<Group> {
    constructor(
        @InjectRepository(Group, ColegioDBNameConnection) readonly repo: Repository<Group>,
    ) {
        super(repo);
    }

    async getGroupsWithGrades() {
        return await this.repo.createQueryBuilder('group').innerJoinAndSelect('group.groupGrade', 'grade').getMany();
    }
}
