import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Subject } from './entities/subject.entity';
import { SubjectsService } from './subjects.service';

@Crud({
    model: {
        type: Subject,
    },
})
@Controller('subjects')
export class SubjectsController {
    constructor(private readonly service: SubjectsService) {
    }

}
