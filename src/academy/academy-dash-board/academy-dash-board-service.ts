import { Injectable } from '@nestjs/common';
import { AcademyInscriptionService } from '../academy-inscription/academy-inscription.service';
import { StatusInscription } from '../academy-inscription/interface/StatusInscription.interface';
import { StudentsService } from '../../school-colegio-ingles/students/students.service';
import { AcademyInscriptionConcepts } from '../academy-inscription-concepts/entities/academy-inscription-concepts.entity';
import { AcademyInscription } from '../academy-inscription/entities/academy-inscription.entity';
import { TypeStudent } from '../../school-colegio-ingles/students/interface/studentsSchool.interface';
import { AcademyActivitiesService } from '../academy-activities/academy-activities.service';


@Injectable()
export class AcademyDashBoardService {
  constructor(
    readonly academyInscriptionService: AcademyInscriptionService,
    readonly alumnosInscriptionService: StudentsService,
    readonly academyActivitiesService: AcademyActivitiesService,
  ) {
  }

  public async loadDash(query: { month: string, year: string, branchOfficeId: number, cycle: number }) {
    return {
      totalStudent: await this.getTotalAlmunosAc(query, TypeStudent.student, StatusInscription.SignedUp),
      totalExternal: await this.getTotalAlmunosAc(query, TypeStudent.externo, StatusInscription.SignedUp),
      totalDownStudent: await this.getTotalAlmunosAc(query, TypeStudent.student, StatusInscription.Baja),
      totalDownExternal: await this.getTotalAlmunosAc(query, TypeStudent.externo, StatusInscription.Baja),
      totalIncludeStudent: await this.getTotalAlmunosAc(query, TypeStudent.student, StatusInscription.SignedUp,true),
      totalIncludeExternal: await this.getTotalAlmunosAc(query, TypeStudent.externo, StatusInscription.SignedUp,true),
    };
  }

  public async getTotalAlmunosAc(data: { branchOfficeId: number, cycle: number },
                                 type: TypeStudent,
                                 status: StatusInscription,
                                 isIncluded: boolean = false,
  ) {
    const inscriptions = this.academyInscriptionService.repo.createQueryBuilder('incripcion')
      .leftJoinAndSelect('incripcion.inscriptionCampus', 'campus')
      .leftJoinAndSelect('incripcion.cycle', 'cycle')
      .leftJoinAndSelect('incripcion.student', 'student')
      .where('campus.id = :id', { id: data.branchOfficeId })
      .andWhere('cycle.id = :cycleId', { cycleId: data.cycle })
      .andWhere('incripcion.isActive = :isActive', { isActive: true })
      .andWhere('incripcion.inscriptionStatus = :status', { status })
      .andWhere('incripcion.isIncluded = :isIncluded', { isIncluded })
      .andWhere('student.typeStudent = :type', { type });
    return await inscriptions.getCount();
  }

  async countStudentByActivity(data: { branchOfficeId: number, cycle: number }) {
    const activities = this.academyActivitiesService.repo.createQueryBuilder('activity')
      .leftJoinAndSelect('activity.academyActInscription', 'incripcion')
      .leftJoinAndSelect('incripcion.inscriptionCampus', 'campus')
      .leftJoinAndSelect('incripcion.cycle', 'cycle')
      .where('activity.isActive = :isActive', { isActive: true })
      .andWhere('campus.id = :id', { id: data.branchOfficeId })
      .andWhere('cycle.id = :cycleId', { cycleId: data.cycle })
      .andWhere('incripcion.isActive = :isActive', { isActive: true })
      .andWhere('incripcion.inscriptionStatus = :status', { status: StatusInscription.SignedUp });
    return await activities.getMany();
  }
}