import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Classification } from './entities/classification.entity';
import { ClassificationsService } from './classifications.service';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';

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
