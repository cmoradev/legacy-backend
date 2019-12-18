import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Student } from './entities/student.entity';
import { StudentsService } from './students.service';

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
      StudentInscriptions: {},
      'StudentInscriptions.classroom': {},
      'StudentInscriptions.cycle': {},
      'StudentInscriptions.campus': {},
      'StudentInscriptions.level': {},
      'StudentInscriptions.grade': {},
      'StudentInscriptions.group': {},
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
}
