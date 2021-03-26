import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Inscription } from './entities/inscription.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../students/entities/student.entity';
import { Attendance, VerificarInscriprions } from './interfaces/inscriptions.interface';
import { VerifyregistratioDto } from './dto/verifyregistratio.dto';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';

@Injectable()
export class InscriptionsService extends TypeOrmCrudService<Inscription> {
    constructor(
        @InjectRepository(Inscription, ColegioDBNameConnection) readonly repo: Repository<Inscription>,
        @InjectRepository(Student, ColegioDBNameConnection) readonly student: Repository<Student>,
    ) {
        super(repo);
    }

    public async reportAttendance(query: Attendance) {
        const inscripcion = this.repo.createQueryBuilder('inscription')
            .leftJoinAndSelect('inscription.inscripStudent', 'inscripStudent')
            .leftJoinAndSelect('inscription.inscripCampus', 'inscripCampus')
            .leftJoinAndSelect('inscription.inscripCycle', 'inscripCycle')
            .leftJoinAndSelect('inscription.inscripLevel', 'inscripLevel')
            .leftJoinAndSelect('inscription.inscripGrade', 'inscripGrade')
            .leftJoinAndSelect('inscription.inscripClassroom', 'inscripClassroom');

        inscripcion.where('inscripCampus.id= :officeId', {
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
        if (query.classRoomId !== 0) {
            inscripcion.andWhere('inscripClassroom.id = :classroomId', {
                classroomId: query.classRoomId,
            });
        }

        return await inscripcion.getMany();
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
}
