import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademiesModality } from './entities/academies-modality.entity';
import { AcademiesModalitiesService } from './academies-modalities.service';

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
export class AcademiesModalitiesController implements CrudController<AcademiesModality> {
    constructor(
        readonly service: AcademiesModalitiesService,
    ) {}
    get base(): CrudController<AcademiesModality> {
        return this;
    }
}
