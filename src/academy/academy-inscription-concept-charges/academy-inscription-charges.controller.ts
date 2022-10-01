import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyInscriptionConceptCharges } from './entites/academy-inscription-concept-charges.entity';
import { IncriptionAcademyChargeDetailsExtraChargeService } from './inscription-academy-charge-details-extra-charge.service';

@Crud({
    model: {
        type: AcademyInscriptionConceptCharges,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        limit: 10,
        join: {},
    },
})
@Controller()
export class AcademyInscriptionChargesController implements CrudController<AcademyInscriptionConceptCharges> {
    constructor(
        readonly service: IncriptionAcademyChargeDetailsExtraChargeService,
    ) {
    }

    get base(): CrudController<AcademyInscriptionConceptCharges> {
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
