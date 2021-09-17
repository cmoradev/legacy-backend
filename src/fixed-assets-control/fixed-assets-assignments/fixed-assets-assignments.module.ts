import { Module } from '@nestjs/common';
import { FixedAssetsAssignmentsService } from './fixed-assets-assignments.service';
import { FixedAssetsAssignmentsController } from './fixed-assets-assignments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FixedAssetAssignment } from './entities/fixed-asset-assignment.entity';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';

@Module({
    imports: [TypeOrmModule.forFeature([FixedAssetAssignment], ColegioDBNameConnection)],
    providers: [FixedAssetsAssignmentsService],
    exports: [FixedAssetsAssignmentsService],
    controllers: [FixedAssetsAssignmentsController],
})
export class FixedAssetsAssignmentsModule {
}
