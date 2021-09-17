import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Injectable()
export class LocationsService extends TypeOrmCrudService<Location> {
    constructor(@InjectRepository(Location, ColegioDBNameConnection) repo) {
        super(repo);
    }
}
