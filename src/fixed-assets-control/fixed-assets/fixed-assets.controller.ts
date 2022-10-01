import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { FixedAsset } from './entities/fixed-asset.entity';
import { FixedAssetsService } from './fixed-assets.service';

@Crud({
    model: {
        type: FixedAsset,
    },
    query: {
        join: {
            classification: {eager: false},
            location: {eager: false},
            branchCompany: {eager: false},
        },
    },
})
@Controller()
export class FixedAssetsController implements CrudController<FixedAsset> {
    constructor(public service: FixedAssetsService) {
    }
}
