import { Controller, Delete, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
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
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
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

    @Delete('soft-deleted/:id')
    public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softDeleteOne(id);
    }

    @Put('soft-restore/:id')
    public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softRestoreOne(id);
    }
}
