import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Assignment } from './entities/assignment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AssignmentsService extends TypeOrmCrudService<Assignment> {
    constructor(
        @InjectRepository(Assignment, 'colegiodb' ) readonly repo: Repository<Assignment>,
    ) {
        super(repo);
    }
}
