import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { ColegioDBNameConnection } from '../common/databases/colegiodb.service';
import { CreditNoteSchool } from './entities/credit-note-school.entity';

@Injectable()
export class CreditNoteSchoolService extends TypeOrmCrudService<CreditNoteSchool> {
    constructor(@InjectRepository(CreditNoteSchool, ColegioDBNameConnection) repo: Repository<CreditNoteSchool>){
        super(repo);
    }

    
}
