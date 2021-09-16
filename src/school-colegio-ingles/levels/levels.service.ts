import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Level } from './entities/level.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Injectable()
export class LevelsService extends TypeOrmCrudService<Level> {
    constructor(
        @InjectRepository(Level, ColegioDBNameConnection) readonly repo: Repository<Level>,
    ) {
        super(repo);
    }

    public async softDeleteOne(id: number) {
        const object = await this.findOne(id);
        if (!object) {
            throw new NotFoundException('This entity does not exists');
        }
        return await this.repo.softDelete(id);
    }

    public async softRestoreOne(id: number) {
        const object = await this.repo.findOne({ id }, { withDeleted: true });
        if (!object) {
            throw new NotFoundException('This entity does not exists');
        }
        return await this.repo.restore(id);
    }
}
