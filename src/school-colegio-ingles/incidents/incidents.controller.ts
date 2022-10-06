import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Incident } from './entities/incident.entity';
import { IncidentsService } from './incidents.service';

@Crud({
    model: {
        type: Incident,
    },
    query: {
        limit: 10,
        join: {
            incidentClassification: {eager: false},
            student: {eager: false},
            classroom: {eager: false},
            teacher: {eager: false},
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
