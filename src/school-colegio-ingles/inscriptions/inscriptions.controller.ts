import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
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
import { ListQuery } from './types/listQuery';
import { reportInscriptionList } from './reports/inscription-group.report';
import * as moment from 'moment';
import { PaymentStatus } from '../../common/enums/PaymentStatus';
import { IQueryReport } from '../school-payments/interfaces/IQueryReport';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';

@Crud({
    model: {
        type: Inscription,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        maxLimit: 200,
        join: {
            inscripStudent: {
                eager: true,
            },
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

    @Delete('soft-deleted/:id')
    public async softDeleteOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softDeleteOne(id);
    }

    @Put('soft-restore/:id')
    public async softRestoreOne(@Param('id', ParseIntPipe) id: number) {
        return await this.service.softRestoreOne(id);
    }

    @Get('/check-duplicate')
    public async addInsccripciones(@Req() req, @Res() res: Response, @Query() options: IQueryReport) {
        try {
            const inscriptions = await this.service.destructurepayments(options);
            const trans = [];
            for (const ins of inscriptions) {
                const data = {
                    inscripcion: ins.id,
                    student: ins.inscripStudent.searchName.toUpperCase(),
                    level: ins.inscripLevel.name,
                    grade: ins.inscripGrade.name,
                    classroom: ins.inscripClassroom ? ins.inscripClassroom.name : 'sin grupo',
                    paidOut: await ins.schoolPayments.filter((concept) => concept.statusPayment === PaymentStatus.PaiOut),
                    notPayed: [],
                };


                data.paidOut.forEach((p) => {
                    const d = ins.schoolPayments.filter((c) => {
                        return c.statusPayment === PaymentStatus.Debit && c.payDay === p.payDay;
                    });
                    if (d.length > 0) {
                        if (d[0].id !== p.id) {
                            data.notPayed.push(d[0]);
                        }
                    }
                });
                if (data.paidOut.length > 0 && data.notPayed.length > 0) {
                    trans.push(data);
                }
            }
            res.header('Content-Type', 'application/json');
            res.send(JSON.stringify(trans, null, 4));
        } catch (e) {
            res.send(e);
        }

    }

    @Get('/report/attendance')
    public async attendance(@Query() query: Attendance, @Req() req, @Res() res: Response) {
        try {
            const result: { data: ListQuery, file: string } = {
                data: {} as ListQuery,
                file: '',
            };
            const data = await this.service.reportAttendance(query);
            if (query.onlyFile) {
                const year = moment().year();
                const month = moment().month() + 1;
                result.file = await reportInscriptionList(data, { year, month });
            } else {
                result.data = data;
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
    public async dashboard() {
        return this.service.getInscriptions();
    }
}
