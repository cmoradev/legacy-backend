import { Crud, CrudController } from '@nestjsx/crud';
import { Subject } from './entities/subject.entity';
import { SubjectsService } from './subjects.service';
import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';

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

    @Delete('soft-deleted/:id')
    public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softDeleteOne(id);
    }

    @Put('soft-restore/:id')
    public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softRestoreOne(id);
    }
}
