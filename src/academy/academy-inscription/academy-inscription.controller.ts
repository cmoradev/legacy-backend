import { Controller, Delete, Param, ParseIntPipe, Put } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyInscription } from './entities/academy-inscription.entity';
import { AcademyInscriptionService } from './academy-inscription.service';

@Crud({
    model: {
        type: AcademyInscription,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        limit: 10,
        join: {
            activity: {eager: false},
            student: {eager: false},
            inscriptionCampus: {eager: false},
            academyGroup: {eager: false},
            'academyGroup.academyGroupCycle': {eager: false},
            enrollmentAgent: {eager: false},
            unEnrollerAgent: {eager: false},
            inscriptionStatus: {eager: false},
            cycle: {eager: false},
            concepts: {eager: false},
            'concepts.acInsConActivity': {eager: false},
            'concepts.acInsConConcepType': {eager: false},
            'concepts.acInsConStatusPayment': {eager: false},
            'concepts.academyChargeDetail': {eager: false},
            'concepts.extraCharges': {eager: false},
        },
    },
})
@Controller()
export class AcademyInscriptionController implements CrudController<AcademyInscription> {
    constructor(
        readonly service: AcademyInscriptionService,
    ) {
    }

    get base(): CrudController<AcademyInscription> {
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
