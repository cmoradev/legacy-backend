import { Body, Controller, Get, Post, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Inscription } from './entities/inscription.entity';
import { InscriptionsService } from './inscriptions.service';
import { diskStorage } from 'multer';
import xlsx from 'node-xlsx';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { VerifyregistratioDto } from './dto/verifyregistratio.dto';
import { Attendance, VerificarInscriprions } from './interfaces/inscriptions.interface';
import { ExcelSheet } from '../../common/office/sheets/interfaces/excel.interface';
import { sheetToObjPage } from '../../common/office/sheets';
import { Response } from 'express';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';
import { Student } from '../students/entities/student.entity';
import { QueryBilling } from '../../mini-store/store-sales/mini-store-sales-payments/interface/InvoiceMiniStore.interface';
import { ListQuery } from './types/listQuery';
import {  reportInscriptionList } from './reports/inscription-group.report';
import * as moment from 'moment';

@UseGuards(JwtGuard)
@Crud({
    model: {
        type: Inscription,
    },
    query: {
        maxLimit: 200,
        join: {
            inscripStudent: {},
            inscripCampus: {},
            inscripGrade: {},
            inscripGroup: {},
            inscripLevel: {},
            inscripCycle: {},
            inscripAgentCreator: {},
            inscripAgentEditor: {},
            inscripClassroom: {},
            paymentPlan: {},
            inscripAssignmentsInscription: {},
            inscripStudyPlanVariant: {},
            inscripStudyPlan: {},
            schoolPayments: { alias: 'schoolPayments' },
            'schoolPayments.paymentPlanConcept': { alias: 'paymentPlanConcepts' },
            'schoolPayments.schoolChargeDetail': { alias: 'schoolChargesDetails' },
            'schoolPayments.schoolChargeDetail.extraCharges': { alias: 'extraCharges' },
            'schoolPayments.extraCharges': {},
        },
    },
})
@Controller()
export class InscriptionsController implements CrudController<Inscription> {
    constructor(
        readonly service: InscriptionsService,
    ) {
    }

    get base(): CrudController<Inscription> {
        return this;
    }

    @Get('/amir')
    async verify(): Promise<any> {
        return 'amir';
    }

    @Get('/add/inscripciones')
    public async addInsccripciones(@Req() req, @Res() res: Response) {
        try {
            // @ts-ignore
            // const data = await this.service.repo.save([] as unknown as Inscription[]);
            res.send({ save: true });
        } catch (e) {
            res.send(e);
        }

    }

    @Get('/report/attendance')
    public async attendance(@Query() query: Attendance, @Req() req, @Res() res: Response) {
        try {
            const result: {data:ListQuery, file: string} = {
                data: {} as ListQuery,
                file: '',
            };
            const data = await this.service.reportAttendance(query);
            if (query.onlyFile) {
                const year = moment().year();
                const month = moment().month() + 1;
                result.file = await reportInscriptionList(data,{ year, month })
            } else {
                result.data = data
            }
            res.send(result);
        } catch (e) {
            res.send(e);
        }

    }

    @Post('/verifyinscription')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: (req, file, cb) => {
                cb(null, './uploads');
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + '_' + file.originalname);
            },
        }),
    }))
    async verifyregistration(@UploadedFile() file, @Body() data: VerifyregistratioDto): Promise<any> {
        const pathfile = path.join(__dirname, `../../../uploads/` + file.filename);
        const Sheets: ExcelSheet[] = xlsx.parse(pathfile);
        const inscripcion: VerificarInscriprions = await sheetToObjPage(Sheets);
        return await this.service.verificarInscription(inscripcion, data);
    }

    @Get('dashboard')
    public async dashboard(){
        return this.service.getInscriptions();
    }
}
