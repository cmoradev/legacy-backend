import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Level } from './entities/level.entity';
import { LevelsService } from './levels.service';

@Crud({
    model: {
        type: Level,
    },
    query: {
        join: {
            grades: {},
            campus: {},
            paymentPlans: {},
            'paymentPlans.paymentConcepts': {},
            levelInscriptions: {},

        },
    },
})
@Controller()
export class LevelsController implements CrudController<Level> {
    constructor(readonly service: LevelsService) {
    }

    get base(): CrudController<Level> {
        return this;
    }
}
