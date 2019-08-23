import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { AssignmentInscription } from './entities/assignment-inscription.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AssignmentIncriptionService extends TypeOrmCrudService<AssignmentInscription> {
    constructor(
        @InjectRepository(AssignmentInscription, 'colegiodb') repo: Repository<AssignmentInscription>,
    ) {
        super(repo);
    }
}
