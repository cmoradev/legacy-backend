import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { StudyPlan } from './entities/study-plan.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StudyPlansService extends TypeOrmCrudService<StudyPlan> {
    constructor(
        @InjectRepository(StudyPlan, 'colegiodb') readonly repo: Repository<StudyPlan>){
        super(repo);
    }
}
