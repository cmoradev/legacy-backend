import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Level } from './entities/level.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LevelsService extends TypeOrmCrudService<Level> {
    constructor(
        @InjectRepository(Level, 'colegiodb') readonly repo: Repository<Level>,
    ) {
        super(repo);
    }
}
