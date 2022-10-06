import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AssignmentInscription } from './entities/assignment-inscription.entity';
import { AssignmentIncriptionService } from './assignment-incription.service';

@Crud({
    model: {
        type: AssignmentInscription,
    },
    query: {
        limit: 10,
        join: {},
    },
})
@Controller()
export class AssignmentIncriptionController implements CrudController <AssignmentInscription> {
    constructor(readonly service: AssignmentIncriptionService) { }
}
