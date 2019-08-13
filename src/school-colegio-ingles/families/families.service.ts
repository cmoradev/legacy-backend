import { Injectable } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Family } from '../subjects/entities/family.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FamiliesService extends TypeOrmCrudService<Family> {
    constructor(
        @InjectRepository(Family, 'colegiodb') readonly repo: Repository<Family>,
    ) { super(repo); }
}
