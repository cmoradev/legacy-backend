import {Controller, Delete, Param, ParseIntPipe, Put} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { SchoolChargesDetailsExtraCharges } from './entities/school-charges-details-extra-charges.entity';
import { SchoolChargesDetailsExtraChargesService } from './school-charges-details-extra-charges.service';

@Crud({
    model: {
        type: SchoolChargesDetailsExtraCharges,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        limit: 10,
        join: {
            schoolChargeDetails: {eager: false},
            systemExtraCharges: {eager: false},
        },
    },
})
@Controller('school-charges-details-extra-charges')
export class SchoolChargesDetailsExtraChargesController implements CrudController<SchoolChargesDetailsExtraCharges> {
    constructor(
        readonly service: SchoolChargesDetailsExtraChargesService,
    ) {
    }

    get base(): CrudController<SchoolChargesDetailsExtraCharges> {
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
