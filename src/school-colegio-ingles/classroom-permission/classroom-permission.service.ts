import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ClassroomPermission } from './entities/classroom-permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClassroomPermissionService extends TypeOrmCrudService<ClassroomPermission> {
    constructor(
        @InjectRepository(ClassroomPermission, 'colegiodb') repo: Repository<ClassroomPermission>,
    ) {
        super(repo);
    }

}
