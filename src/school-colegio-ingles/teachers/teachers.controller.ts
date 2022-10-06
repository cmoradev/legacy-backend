import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Teacher } from './entities/teacher.entity';
import { TeachersService } from './teachers.service';

@Crud({
    model: {
        type: Teacher,
    },
    query: {
        limit: 10,
        join: {
            incidents: {eager: false},
            user: {
                eager: false,
                exclude: ['password', 'rememberToken'],
            },
        },
    },
})
@Controller()
export class TeachersController implements CrudController<Teacher> {
    constructor(
        readonly service: TeachersService,
    ) { }
    get base(): CrudController<Teacher> {
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
