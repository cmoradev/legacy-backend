import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Identifier } from './entities/identifier.entity';
import { IdentifierService } from './identifier.service.';

@Crud({
    model: {
        type: Identifier,
    },
    query: {
        limit: 10,
        join: {
            student: {eager: false},
            "student.studentCampus": {eager: false},
            "student.family": {eager: false},
            "student.studentInscriptions": {eager: false},
        },
    }
})
@Controller()
export class IdentifierController implements CrudController<Identifier> {
    constructor(readonly service: IdentifierService) { }
    get base(): CrudController<Identifier> {
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

