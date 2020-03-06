import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ClassroomPermission } from './entities/classroom-permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class ClassroomPermissionService extends TypeOrmCrudService<ClassroomPermission> {
    constructor(
        @InjectRepository(ClassroomPermission, ColegioDBNameConnection) repo: Repository<ClassroomPermission>,
    ) {
        super(repo);
    }

}
