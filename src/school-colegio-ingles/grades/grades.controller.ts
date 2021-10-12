import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Grade } from './entities/grade.entity';
import { GradesService } from './grades.service';

@Crud({
    model: {
        type: Grade,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        join: {
            'level': {},
            'level.campus': {},
            paymentPlans: {},
            gradeInscriptions: {},
            'gradeInscriptions.inscripCampus': {},
            'gradeInscriptions.inscripCycle': {},
            'gradeInscriptions.inscripClassroom':{}
            
        },
    },
})
@Controller()
export class GradesController implements CrudController<Grade> {
    constructor(
        readonly service: GradesService,
    ) {
    }

    get base(): CrudController<Grade> {
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
