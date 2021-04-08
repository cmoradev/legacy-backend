import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Inscription } from './entities/inscription.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../students/entities/student.entity';
import { Attendance, VerificarInscriprions } from './interfaces/inscriptions.interface';
import { VerifyregistratioDto } from './dto/verifyregistratio.dto';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { ClassroomsService } from '../classrooms/classrooms.service';
import { BranchOffice } from '../../system/branch-office/entities/branch-office.entity';
import { Cycle } from '../cycles/entities/cycle.entity';
import { Classroomembers, ListQuery } from './types/listQuery';
import { LevelsService } from '../levels/levels.service';
import { InscriptionStatusStudent, StudentInscriptionStatus } from '../../common/enums/PaymentStatus';
import { TypeStudent } from '../students/interface/studentsSchool.interface';

@Injectable()
export class InscriptionsService extends TypeOrmCrudService<Inscription> {
  constructor(
    @InjectRepository(Inscription, ColegioDBNameConnection) readonly repo: Repository<Inscription>,
    @InjectRepository(Student, ColegioDBNameConnection) readonly student: Repository<Student>,
    readonly classroomService: ClassroomsService,
    readonly levelService: LevelsService,
  ) {
    super(repo);
  }

  public async reportAttendance(query: Attendance) {
    const result: ListQuery = {
      name: (await this.levelService.findOne({ where: { id: query.levelId } })).name,
      branchOffice: {} as BranchOffice,
      cycle: {} as Cycle,
      classroom: [],
    };
    const inscripcion = this.repo.createQueryBuilder('inscription')
      .leftJoinAndSelect('inscription.inscripStudent', 'inscripStudent')
      .leftJoinAndSelect('inscription.inscripCampus', 'inscripCampus')
      .leftJoinAndSelect('inscription.inscripCycle', 'inscripCycle')
      .leftJoinAndSelect('inscription.inscripLevel', 'inscripLevel')
      .leftJoinAndSelect('inscription.inscripGrade', 'inscripGrade')
      .leftJoinAndSelect('inscription.inscripClassroom', 'inscripClassroom')
      .where('inscription.idStatus != :status', {
        status: 0,
      })
      .andWhere('inscripStudent.statusStudent = \'1\'');
    // @ts-ignore
    if (query.classRoomId === 0 || query.classRoomId === '0') {
      const classRooms = await this.classroomService.getClassRoomByLevel(query.levelId, query.gradeId, query.cycleId);

      for (const clasro of classRooms) {
        const room: Classroomembers = {
          name: clasro.name,
          students: [],
        };
        const ins = inscripcion;
        ins.andWhere('inscripCycle.id = :cycleId', {
          cycleId: query.cycleId,
        });

        ins.andWhere('inscripLevel.id = :levelId', {
          levelId: query.levelId,
        });

        ins.andWhere('inscripGrade.id = :gradeId', {
          gradeId: query.gradeId,
        });
        inscripcion.andWhere('inscripClassroom.id = :classroomId', {
          classroomId: clasro.id,
        });
        const data = await ins.getMany();
        let i = 1;
        for (const studen of data) {
          result.branchOffice = studen.inscripCampus;
          result.cycle = studen.inscripCycle;
          room.students.push({
            id: i,
            matricula: studen.inscripStudent.matricula,
            name: studen.inscripStudent.name + ' ' + studen.inscripStudent.lastNameFather + ' ' + studen.inscripStudent.lastNameMother,
          });
          i++;
        }
        result.classroom.push(room);
      }

    } else {

      inscripcion.andWhere('inscripCampus.id= :officeId', {
        officeId: query.branchOfficeId,
      });

      inscripcion.andWhere('inscripCycle.id = :cycleId', {
        cycleId: query.cycleId,
      });

      inscripcion.andWhere('inscripLevel.id = :levelId', {
        levelId: query.levelId,
      });

      inscripcion.andWhere('inscripGrade.id = :gradeId', {
        gradeId: query.gradeId,
      });

      inscripcion.andWhere('inscripClassroom.id = :classroomId', {
        classroomId: query.classRoomId,
      });

      const room: Classroomembers = {
        name: '',
        students: [],
      };

      const data = await inscripcion.getMany();
      let i = 1;
      for (const studen of data) {
        room.name = studen.inscripClassroom.name;
        result.branchOffice = studen.inscripCampus;
        result.cycle = studen.inscripCycle;
        room.students.push({
          id: i,
          matricula: studen.inscripStudent.matricula,
          name: studen.inscripStudent.name + ' ' + studen.inscripStudent.lastNameFather + ' ' + studen.inscripStudent.lastNameMother,
        });
        i++;
      }
      result.classroom.push(room);

    }

    return result;
  }


  public async verificarInscription(data: VerificarInscriprions, datainsc: VerifyregistratioDto): Promise<any> {
    /*  const result: any = {
        registered: [],
        notregistered: [],
        nonstudent: [],
        enrolledStudents: [],
      };
      result.enrolledStudents = await this.inscriptions.find({
        relations: ['student'],
        where: {
          idPlantel: datainsc.plantel,
          idLevel: datainsc.nivel,
          idGrade: datainsc.grado,
          idGroup: datainsc.grupo,
          idCycle: datainsc.ciclo,
        },
      });

      for (const student of data.data) {

        const studentR: any = await this.student.findOne({ matricula: student.matricula });
        if (studentR) {
          const inscripcionalumno = await this.inscriptions.findOne({
              idStudent: studentR.id,
              idPlantel: datainsc.plantel,
              idLevel: datainsc.nivel,
              idGrade: datainsc.grado,
              idGroup: datainsc.grupo,
              idCycle: datainsc.ciclo,
            },
          );

          if (inscripcionalumno) {
            studentR.inscripcion = inscripcionalumno;
            // inscritor y registrado en el grupo grado nivel
            result.registered.push(studentR);
          } else {
            // regitrado pero no inscrito en la seecion selecionada
            result.notregistered.push(studentR);
          }
        } else {
          // no regitrado en el sistema
          console.log(student)
          result.nonstudent.push(student);
        }

      }
      return result;*/
  }

  async getInscriptions() {
    const getStudentsByStatus = async (type: InscriptionStatusStudent) => {
      return await this.repo
        .createQueryBuilder('student')
        .andWhere('student.idStatus = :status',
          { status: type },
        )
        .getCount();
    };
    return {
      totalNewStudents: await getStudentsByStatus(InscriptionStatusStudent.NewEnrollment),
      totalReEnrollment: await getStudentsByStatus(InscriptionStatusStudent.ReEnrollment),
      totalReEntry: await getStudentsByStatus(InscriptionStatusStudent.ReEntry),
      totalUnsubscribed: await getStudentsByStatus(InscriptionStatusStudent.UnSubscribed),
    };
  }
}
