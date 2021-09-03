import { Controller, Delete, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademiesModality } from './entities/academy-modality.entity';
import { AcademyModalitiesService } from './academy-modalities.service';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Crud({
    model: {
        type: AcademiesModality,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        join: {
            students: {},
        },
    },
})
@Controller()
export class AcademyModalitiesController implements CrudController<AcademiesModality> {
    constructor(
        readonly service: AcademyModalitiesService,
    ) {
    }

    get base(): CrudController<AcademiesModality> {
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

