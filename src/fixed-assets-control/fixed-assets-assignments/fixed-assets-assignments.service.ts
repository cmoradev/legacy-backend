import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { FixedAssetAssignment } from './entities/fixed-asset-assignment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class FixedAssetsAssignmentsService extends TypeOrmCrudService<FixedAssetAssignment> {
    constructor(@InjectRepository(FixedAssetAssignment, ColegioDBNameConnection) repo) {
        super(repo);
    }
}
