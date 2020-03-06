import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Group } from './entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class GroupsService extends TypeOrmCrudService<Group> {
    constructor(
        @InjectRepository(Group, ColegioDBNameConnection) readonly repo: Repository<Group>,
    ) { super(repo); }
}
