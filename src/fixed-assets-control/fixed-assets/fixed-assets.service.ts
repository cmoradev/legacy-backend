import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { FixedAsset } from './entities/fixed-asset.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class FixedAssetsService extends TypeOrmCrudService<FixedAsset> {
    constructor(@InjectRepository(FixedAsset, ColegioDBNameConnection) repo) {
        super(repo);
    }
}
