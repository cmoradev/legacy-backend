import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CreditNoteSchoolService } from './credit-note-school.service';
import { CreditNoteSchool } from './entities/credit-note-school.entity';

@Crud({
    model: {
        type: CreditNoteSchool,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null
            },
        },
        join: {

        }
    }
})
@Controller('credit-note-school')
export class CreditNoteSchoolController implements CrudController<CreditNoteSchool>{
    constructor(readonly service: CreditNoteSchoolService) {
    }
}
