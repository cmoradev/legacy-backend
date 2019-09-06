import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Incident } from './entities/incident.entity';
import { IncidentsService } from './incidents.service';

@Crud({
    model: {
        type: Incident,
    },
    query: {
        join: {
            incidentClassification: {},
            student: {},
            classroom: {},
            teacher: {},
        },
    },
})
@Controller()
export class IncidentsController implements CrudController<Incident> {
    constructor(readonly service: IncidentsService) {
    }

    get base(): CrudController<Incident> {
        return this;
    }
}
