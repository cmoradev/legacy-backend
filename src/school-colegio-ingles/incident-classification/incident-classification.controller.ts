import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { IncidentClassificationService } from './incident-classification.service';
import { IncidentClassification } from './entities/incident-classification.entity';

@Crud({
    model: {
        type: IncidentClassification,
    },
    query: {
        limit: 10,
        join: {
            incidents: {eager: false},
        },
    },
})
@Controller()
export class IncidentClassificationController implements CrudController<IncidentClassification> {
    constructor(readonly service: IncidentClassificationService) {
    }

    get base(): CrudController<IncidentClassification> {
        return this;
    }
}
