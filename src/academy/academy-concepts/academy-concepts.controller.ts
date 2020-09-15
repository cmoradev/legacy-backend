import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyConcepts } from './entities/academy-concepts.entity';
import { AcademyConceptsService } from './academy-concepts.service';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Crud({
    model: {
        type: AcademyConcepts,
    },
    query: {
        limit: 200,
        join: {
            academyConceptsCycle: {},
            academyConceptsCampus: {},
            academyConceptsLevel: {},
            academyConceptsType: {},
            academyConceptsActivity: {},
        },
    },
})
@Controller()
export class AcademyConceptsController implements CrudController<AcademyConcepts> {
    constructor(
        readonly service: AcademyConceptsService,
    ) {
    }

    get base(): CrudController<AcademyConcepts> {
        return this;
    }
}
