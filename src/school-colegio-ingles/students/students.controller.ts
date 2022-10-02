import { Controller, Delete, Get, Param, ParseIntPipe, Put, Req, Res } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Student } from './entities/student.entity';
import { StudentsService } from './students.service';
import { Response } from 'express';
import { alumnos } from './catalogue/students.catalogue';

@Crud({
    model: {
        type: Student,
    },
    query: {
        filter: {
            deletedAt: {
                $eq: null,
            },
        },
        limit: 10,
        join: {
            family: {eager: false},
            academiesModality: {eager: false},
            studentCampus: {eager: false},
            incidents: {eager: false},
            'incidents.teacher': {eager: false},
            'incidents.classroom': {eager: false},
            'incidents.incidentClassification': {eager: false},
            studentInscriptions: {eager: false},
            'studentInscriptions.classroom': {eager: false},
            'studentInscriptions.cycle': {eager: false},
            'studentInscriptions.campus': {eager: false},
            'studentInscriptions.level': {eager: false},
            'studentInscriptions.grade': {eager: false},
            'studentInscriptions.group': {eager: false},
            'studentInscriptions.inscripStudent': {eager: false},
            'studentInscriptions.inscripCampus': {eager: false},
            'studentInscriptions.inscripGrade': {eager: false},
            'studentInscriptions.inscripGroup': {eager: false},
            'studentInscriptions.inscripLevel': {eager: false},
            'studentInscriptions.inscripCycle': {eager: false},
            'studentInscriptions.inscripAgentCreator': {eager: false},
            'studentInscriptions.inscripAgentEditor': {eager: false},
            'studentInscriptions.inscripClassroom': {eager: false},
            'studentInscriptions.paymentPlan': {eager: false},
            'studentInscriptions.inscripAssignmentsInscription': {eager: false},
            'studentInscriptions.inscripStudyPlanVariant': {eager: false},
            'studentInscriptions.inscripStudyPlan': {eager: false},
            'studentInscriptions.schoolPayments': {eager: false},
            'studentInscriptions.schoolPayments.extraCharges': {eager: false},
        },
    },
})
@Controller()
export class StudentsController implements CrudController<Student> {
    constructor(
        readonly service: StudentsService,
    ) {
    }

    get base(): CrudController<Student> {
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

    @Get('/count-by-type/:studentType')
    public async countStudentsByType(@Param('studentType') studentType: string) {
        const total = await this.service.count({ where: { typeStudent: studentType } });// contamos el total por typo de estudiante
        let matricula = this.service.generateMatricula(total, +studentType);// generamos la matricula
        const findMatricula = await this.service.findOne({ where: { matricula } }); // verificamos si la matricula existe
        if (findMatricula) {
            // si existe le aumentamos uno mas al total para generar otra nueva
            matricula = this.service.generateMatricula(total + 1, +studentType);
        }
        return matricula;
    }


    @Get('/add/students')
    public async addStudents(@Req() req, @Res() res: Response) {
        try {
            const alumnos = [
                {
                    'name_search': 'chrristopher enrique ibañez valencia',
                    'Total': 2,
                },
                {
                    'name_search': 'diego macìas melendez',
                    'Total': 2,
                },
                {
                    'name_search': 'julieta ramìrez ramìrez',
                    'Total': 2,
                },
                {
                    'name_search': 'marian sotelo rojas',
                    'Total': 2,
                },
                {
                    'name_search': 'mauricio olvera lópez',
                    'Total': 2,
                },
                {
                    'name_search': 'perla ramìrez ulloa',
                    'Total': 2,
                },
                {
                    'name_search': 'sebastián carrera damián',
                    'Total': 2,
                },
                {
                    'name_search': 'victoria zyznawsky ramírez',
                    'Total': 2,
                },
            ];
            const data = [];
            for (const st of alumnos) {
                const alu = await this.service.repo.createQueryBuilder('alumnos')
                    .leftJoinAndSelect('alumnos.studentInscriptions', 'studentInscriptions')
                    .leftJoinAndSelect('studentInscriptions.inscripGrade', 'inscripGrade')
                    .leftJoinAndSelect('studentInscriptions.inscripClassroom', 'inscripClassroom')

                    // .leftJoinAndSelect('studentInscriptions.schoolPayments', 'schoolPayments')
                    .select([
                        'alumnos.id', 'alumnos.searchName',
                        'studentInscriptions.id',
                        'inscripGrade.id', 'inscripGrade.name',
                        'inscripClassroom.id', 'inscripClassroom.name',
                        // 'schoolPayments.id',
                    ])
                    .where('alumnos.name_search like :name', { name: st.name_search })
                    .getMany();
                data.push(alu);
            }
            res.send({ save: true, data });
        } catch (e) {
            res.send(e);
        }

    }

}
