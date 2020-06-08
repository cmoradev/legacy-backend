import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyActivity } from './entities/academy-activity.entity';
import { AcademyActivitiesService } from './academy-activities.service';
import { QuerySimpleReport } from '../../mini-store/store-sales/mini-store-sales-payments/interface/InvoiceMiniStore.interface';
import { QueryMensualidades } from './types/academyActvities.interface';

@Crud({
    model: {
        type: AcademyActivity,
    },
    query: {
        limit: 200,
        join: {
            academyActivityConcepts: {},
            academyActivityGroups: {},
            'academyActivityGroups.academyGroupCycle': {},
            academyActInscription: {},
        },
    },
})
@Controller()
export class AcademyActivitiesController implements CrudController<AcademyActivity> {
    constructor(
        readonly service: AcademyActivitiesService,
    ) {
    }

    get base(): CrudController<AcademyActivity> {
        return this;
    }

    @Get('/mensualidadades')
    async simpleReport(@Req() request, @Res() response, @Query() query: QueryMensualidades) {
        response.send(await this.service.monthsPayments(query));
    }
}
