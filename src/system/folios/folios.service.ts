import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Folio } from './entities/folio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Injectable()
export class FoliosService extends TypeOrmCrudService<Folio> {
    constructor(@InjectRepository(Folio, ColegioDBNameConnection) repo) {
        super(repo);
    }
}
