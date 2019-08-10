import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Subject } from './entities/subject.entity';
import { SubjectsService } from './subjects.service';

@Crud({
    model: {
        type: Subject,
    },
})
@Controller()
export class SubjectsController implements CrudController<Subject> {
    constructor(readonly service: SubjectsService) { }
    get base(): CrudController<Subject> {
        return this;
    }
}
