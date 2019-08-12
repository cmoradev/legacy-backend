import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Inscription } from './entities/inscription.entity';
import { InscriptionsService } from './inscriptions.service';

@Crud({
    model: {
        type: Inscription,
    },
})
@Controller('inscriptions')
export class InscriptionsController implements CrudController<Inscription> {
    constructor(
        readonly service: InscriptionsService,
    ) {
    }

    get base(): CrudController<Inscription> {
        return this;
    }
}
