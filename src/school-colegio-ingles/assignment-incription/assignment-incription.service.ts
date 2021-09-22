import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { AssignmentInscription } from './entities/assignment-inscription.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Injectable()
export class AssignmentIncriptionService extends TypeOrmCrudService<AssignmentInscription> {
    constructor(
        @InjectRepository(AssignmentInscription, ColegioDBNameConnection) repo: Repository<AssignmentInscription>,
    ) {
        super(repo);
    }
}
