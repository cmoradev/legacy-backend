import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Student } from './entities/student.entity';
import { StudentsService } from './students.service';
import { JwtGuard } from '../../system/auth/guards/jwt.guard';
import { TypeStudent } from './interface/studentsSchool.interface';

//  @UseGuards(JwtGuard)
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


}
