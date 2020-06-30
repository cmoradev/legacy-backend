import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AcademyActivity } from './entities/academy-activity.entity';
import { AcademyActivitiesService } from './academy-activities.service';
import { QuerySimpleReport } from '../../mini-store/store-sales/mini-store-sales-payments/interface/InvoiceMiniStore.interface';
import { QueryMensualidades } from './types/academyActvities.interface';
import { AcademyActivityReport } from './reports/academy-activity.report';
import { getDaysArray } from '../../common/date';
import * as moment from 'moment';
import { months } from 'moment';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';
@UseGuards(JwtGuard)
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

    @Get('/monthly-payments')
    async simpleReport(@Req() request, @Res() response, @Query() query: QueryMensualidades) {
        const year = moment(query.month).year();
        const month = moment(query.month).month() + 1;

        const data = await this.service.monthsPayments(query);
        if (query.file) {
            const report = new AcademyActivityReport();
            const file = await report.monthlyPayments(data, { year, month });
            response.send({
                src: file,
                type: 'excel',
                name: 'monthly-payments',
            });
        } else {
            response.send(data);
        }
    }
}
