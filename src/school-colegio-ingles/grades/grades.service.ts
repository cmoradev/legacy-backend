import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Grade } from '../subjects/entities/grade.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GradesService extends TypeOrmCrudService<Grade> {
    constructor(
        @InjectRepository(Grade, 'colegiodb') readonly repo: Repository<Grade>,
    ) {
        super(repo);
    }
}
