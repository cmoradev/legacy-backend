import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService extends TypeOrmCrudService<Role> {
    constructor(
        @InjectRepository(Role, 'colegiodb') repo: Repository<Role>,
    ) {
        super(repo);
    }
}
