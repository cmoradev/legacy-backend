import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { AssignmentSubject } from './entities/assignment-subject.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Injectable()
export class AssignmentsSubjectsService extends TypeOrmCrudService<AssignmentSubject> {
    constructor(
        @InjectRepository(AssignmentSubject, ColegioDBNameConnection) readonly repo: Repository<AssignmentSubject>,
    ) { super(repo); }
}
