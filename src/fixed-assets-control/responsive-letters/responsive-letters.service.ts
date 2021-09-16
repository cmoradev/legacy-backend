import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ResponsiveLetter } from './entities/responsive-letter.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Injectable()
export class ResponsiveLettersService extends TypeOrmCrudService<ResponsiveLetter> {
    constructor(@InjectRepository(ResponsiveLetter, ColegioDBNameConnection) repo) {
        super(repo);
    }
}
