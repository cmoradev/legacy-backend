import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ResponsiveLetter } from './entities/responsive-letter.entity';
import { ResponsiveLettersService } from './responsive-letters.service';

@Crud({
    model: {
        type: ResponsiveLettersController,
    },
    query: {
        join: {
            fixedAssetAssignments: {},
            'fixedAssetAssignments.fixedAsset': {},
            employee: {},
            jobPosition: {},
        },
    },
})
@Controller()
export class ResponsiveLettersController implements CrudController<ResponsiveLetter> {
    constructor(public service: ResponsiveLettersService) {
    }
}
