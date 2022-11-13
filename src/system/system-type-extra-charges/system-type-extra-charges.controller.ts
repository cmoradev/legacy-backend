import {Controller, Delete, Param, ParseIntPipe, Put} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SystemTypeExtraChargesService } from './system-type-extra-charges.service';
import { SystemTypeExtraCharges } from './entities/system-type-extra-charges.entity';

@Crud({
    model: {
        type: SystemTypeExtraCharges,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        limit: 10,
        join: {
            systemTyExCharCharge: {eager: false},
            'systemTyExCharCharge.extraChargesType': {eager: false},
        },
    },
})
@Controller()
export class SystemTypeExtraChargesController implements CrudController<SystemTypeExtraCharges> {
    constructor(readonly service: SystemTypeExtraChargesService) {
    }

    get base(): CrudController<SystemTypeExtraCharges> {
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
