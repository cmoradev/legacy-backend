import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Modality } from './entities/modality.entity';
import { ModalitiesService } from './modalities.service';

@Crud({
    model: { type: Modality },
})
@Controller()
export class ModalitiesController implements CrudController<Modality> {

    constructor(readonly service: ModalitiesService) {
    }

    get base(): CrudController<Modality> {
        return this;
    }
}
