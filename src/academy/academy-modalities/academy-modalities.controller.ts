import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademiesModality } from './entities/academy-modality.entity';
import { AcademyModalitiesService } from './academy-modalities.service';

@Crud({
    model: {
        type: AcademiesModality,
    },
    query: {
        join: {
            students: {},
        },
    },
})
@Controller()
export class AcademyModalitiesController implements CrudController<AcademiesModality> {
    constructor(
        readonly service: AcademyModalitiesService,
    ) {}
    get base(): CrudController<AcademiesModality> {
        return this;
    }
}

