import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Student } from './entities/student.entity';
import { StudentsService } from './students.service';
import { Response } from 'express';
import { alumnos } from './catalogue/students.catalogue';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Crud({
    model: {
        type: Student,
    },
    query: {
        limit: 200,
        join: {
            family: {},
            academiesModality: {},
            studentCampus: {},
            incidents: {},
            'incidents.teacher': {},
            'incidents.classroom': {},
            'incidents.incidentClassification': {},
            studentInscriptions: {},
            'studentInscriptions.classroom': {},
            'studentInscriptions.cycle': {},
            'studentInscriptions.campus': {},
            'studentInscriptions.level': {},
            'studentInscriptions.grade': {},
            'studentInscriptions.group': {},
            'studentInscriptions.inscripStudent': {},
            'studentInscriptions.inscripCampus': {},
            'studentInscriptions.inscripGrade': {},
            'studentInscriptions.inscripGroup': {},
            'studentInscriptions.inscripLevel': {},
            'studentInscriptions.inscripCycle': {},
            'studentInscriptions.inscripAgentCreator': {},
            'studentInscriptions.inscripAgentEditor': {},
            'studentInscriptions.inscripClassroom': {},
            'studentInscriptions.paymentPlan': {},
            'studentInscriptions.inscripAssignmentsInscription': {},
            'studentInscriptions.inscripStudyPlanVariant': {},
            'studentInscriptions.inscripStudyPlan': {},
            'studentInscriptions.schoolPayments': {},
            'studentInscriptions.schoolPayments.extraCharges': {},
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
