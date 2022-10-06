import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { FixedAssetAssignment } from './entities/fixed-asset-assignment.entity';
import { FixedAssetsAssignmentsService } from './fixed-assets-assignments.service';

@Crud({
    model: {
        type: FixedAssetAssignment,
    },
    query: {
        limit: 10,
        join: {
            employee: {eager: false},
            fixedAsset: {eager: false},
            responsiveLetter: {eager: false},
        },
    },
})
@Controller()
export class FixedAssetsAssignmentsController implements CrudController<FixedAssetAssignment> {
    constructor(public service: FixedAssetsAssignmentsService) {
    }
}
