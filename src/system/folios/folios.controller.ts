import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Folio } from './entities/folio.entity';
import { FoliosService } from './folios.service';

@Crud({
    model: {
        type: Folio,
    },
    query: {
        limit: 10,
        join: {},
    },
})
@Controller()
export class FoliosController implements CrudController<Folio> {
    constructor(public service: FoliosService) {
    }
}
