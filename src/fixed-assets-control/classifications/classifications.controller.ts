import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Classification } from './entities/classification.entity';
import { ClassificationsService } from './classifications.service';

@Crud({
    model: {
        type: Classification,
    },
})
@Controller()
export class ClassificationsController implements CrudController<Classification> {
    constructor(public service: ClassificationsService) {
    }
}
