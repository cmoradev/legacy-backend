import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
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
}
