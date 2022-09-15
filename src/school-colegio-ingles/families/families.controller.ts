import { Controller, Delete, Param, ParseIntPipe, Put, Get, Req, Res, } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Family } from './entities/family.entity';
import { FamiliesService } from './families.service';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';
import { Response } from 'express';

@Crud({
    model: {
        type: Family,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        join: {
            students: {},
            campus: {},
            businessName: {},
            users: {}
        },
    },
})
@Controller()
export class FamiliesController implements CrudController<Family> {
    constructor(
        readonly service: FamiliesService,
    ) {
    }

    get base(): CrudController<Family> {
        return this;
    }

    @Get('/add/families')
    public async addFamilies(@Req() req, @Res() res: Response) {
        try {
            res.send({ save: true });
        } catch (e) {
            res.send(e);
        }

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
