import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyInscription } from './entities/academy-inscription.entity';
import { AcademyInscriptionService } from './academy-inscription.service';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Crud({
    model: {
        type: AcademyInscription,
    },
    query: {
        limit: 200,
        join: {
            activity: {},
            student: {},
            inscriptionCampus: {},
            academyGroup: {},
            enrollmentAgent: {},
            unEnrollerAgent: {},
            inscriptionStatus: {},
            cycle: {},
            concepts: {},
            'concepts.acInsConActivity': {},
            'concepts.acInsConConcepType': {},
            'concepts.acInsConStatusPayment': {},
            'concepts.extraCharges': {},
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
}
