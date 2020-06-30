import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Student } from './entities/student.entity';
import { StudentsService } from './students.service';
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
        const total: Student[] = await this.service.find({ where: [{ typeStudent: studentType }] });
        return total.length || 0;
    }
}
