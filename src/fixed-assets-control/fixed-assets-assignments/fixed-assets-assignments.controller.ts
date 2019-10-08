import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { FixedAssetAssignment } from './entities/fixed-asset-assignment.entity';
import { FixedAssetsAssignmentsService } from './fixed-assets-assignments.service';

@Crud({
    model: {
        type: FixedAssetAssignment,
    },
    query: {
        join: {
            employee: {},
            fixedAsset: {},
            responsiveLetter: {},
        },
    },
})
@Controller()
export class FixedAssetsAssignmentsController implements CrudController<FixedAssetAssignment> {
    constructor(public service: FixedAssetsAssignmentsService) {
    }
}
