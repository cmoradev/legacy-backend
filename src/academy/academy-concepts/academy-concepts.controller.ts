import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyConcepts } from './entities/academy-concepts.entity';
import { AcademyConceptsService } from './academy-concepts.service';

@Crud({
    model: {
        type: AcademyConcepts,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        limit: 10,
        join: {
            academyConceptsCycle: {eager: false},
            academyConceptsCampus: {eager: false},
            academyConceptsLevel: {eager: false},
            academyConceptsType: {eager: false},
            academyConceptsActivity: {eager: false},
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

    @Delete('soft-deleted/:id')
    public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softDeleteOne(id);
    }

    @Put('soft-restore/:id')
    public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softRestoreOne(id);
    }
}
