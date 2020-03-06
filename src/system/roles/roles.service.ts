import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class RolesService extends TypeOrmCrudService<Role> {
    constructor(
        @InjectRepository(Role, ColegioDBNameConnection) repo: Repository<Role>,
    ) {
        super(repo);
    }
}
