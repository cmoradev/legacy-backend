import { Controller, Delete, Get, Param, ParseIntPipe, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Activity } from './entities/academy-activity.entity';
import { AcademyActivitiesService } from './academy-activities.service';
import { QueryMensualidades } from './types/academyActvities.interface';
import { AcademyActivityReport } from './reports/academy-activity.report';
import * as moment from 'moment';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Crud({
    model: {
        type: Activity,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        limit: 200,
        join: {
            academyActivityConcepts: {},
            academyActivityGroups: {},
            'academyActivityGroups.academyGroupCycle': {
                alias: 'academyGroupCycle',
            },
            academyActInscription: {},
        },
    },
})
@Controller()
export class AcademyActivitiesController implements CrudController<Activity> {
    constructor(
        readonly service: AcademyActivitiesService,
    ) {
    }

    get base(): CrudController<Activity> {
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
