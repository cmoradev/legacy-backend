import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Inscription } from './entities/inscription.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { Student } from '../students/entities/student.entity';
import { Attendance, VerificarInscriprions } from './interfaces/inscriptions.interface';
import { VerifyregistratioDto } from './dto/verifyregistratio.dto';
import { ColegioDBNameConnection } from '../../databases/colegiodb.service';
import { ClassroomsService } from '../classrooms/classrooms.service';
import { BranchOffice } from '../../system/branch-office/entities/branch-office.entity';
import { Cycle } from '../cycles/entities/cycle.entity';
import { Classroomembers, ListQuery } from './types/listQuery';
import { LevelsService } from '../levels/levels.service';
import { InscriptionStatusStudent } from '../../common/enums/PaymentStatus';
import { Group } from '../groups/entities/group.entity';
import { Grade } from '../grades/entities/grade.entity';
import { Level } from '../levels/entities/level.entity';
import { User } from '../../system/users/entities/user.entity';
import { Classroom } from '../classrooms/entities/classroom.entity';
import { PaymentPlan } from '../payment-plans/entities/payment-plan.entity';
import { StudyPlanVariant } from '../study-plan-variants/entities/study-plan-variants.entity';
import { StudyPlan } from '../study-plans/entities/study-plan.entity';
import { SchoolPayment } from '../school-payments/entities/school-payment.entity';
import { StudentsService } from '../students/students.service';
import { GradesService } from '../grades/grades.service';
import { GroupsService } from '../groups/groups.service';
import { CyclesService } from '../cycles/cycles.service';
import { BranchOfficeService } from '../../system/branch-office/branch-office.service';
import { PaymentPlansService } from '../payment-plans/payment-plans.service';
import { StudyPlansService } from '../study-plans/study-plans.service';
import { StudyPlanVariantsService } from '../study-plan-variants/study-plan-variants.service';

export interface IRelationsInscriptions {
    Student: Student[],
    Group: Group[],
    Grade: Grade[],
    Level: Level[],
    Cycle: Cycle[],
    BranchOffice: BranchOffice[],
    User: User[],
    Classroom: Classroom[],
    PaymentPlan: PaymentPlan[],
    StudyPlanVariant: StudyPlanVariant[],
    StudyPlan: StudyPlan[],
    SchoolPayment: SchoolPayment[],
}

@Injectable()
export class InscriptionsService extends TypeOrmCrudService<Inscription> {
    constructor(
        @InjectRepository(Inscription, ColegioDBNameConnection) readonly repo: Repository<Inscription>,
        @InjectRepository(Student, ColegioDBNameConnection) readonly student: Repository<Student>,
        readonly classroomService: ClassroomsService,
        readonly levelService: LevelsService,
        readonly studentService: StudentsService,
        readonly gradesService: GradesService,
        readonly groupsService: GroupsService,
        readonly cyclesService: CyclesService,
        readonly branchOfficeService: BranchOfficeService,
        readonly paymentPlansService: PaymentPlansService,
        readonly studyPlansService: StudyPlansService,
        readonly studyPlanVariantService: StudyPlanVariantsService,
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

    async getNamesAttributesInscriptions(fields: any) {
        const propierties = this.repo.metadata.propertiesMap;
        const entityKeys: string[] = [];
        Object.keys(propierties).map((key) => {
            if (key !== fields[key]) {
                entityKeys.push(key);
            }
        });
        return entityKeys;
    }

    async relationships() {
        const relationships = this.repo.metadata.ownRelations.map(relation => relation.inverseEntityMetadata.targetName);
        const relationsTrash = ['AssignmentInscription'];
        const filteredRelations = relationships.filter(value => !relationsTrash.includes(value));
        const relationsResult: IRelationsInscriptions = {} as IRelationsInscriptions;
        for (const relation of filteredRelations) {
            const repository = await getRepository(relation, ColegioDBNameConnection);
            let relationData = await repository.find({ cache: true });
            relationData = JSON.parse(JSON.stringify(relationData));
            relationsResult[relation] = relationData;
        }
        const lastRecord = await this.repo.createQueryBuilder('inscriptions').select('inscriptions.id').addOrderBy('inscriptions.id', 'DESC').limit(1).getOne();
        return {
            relations: relationsResult,
            lastRecord,
        };
    }

    async validateData(data: any[]) {
        const studentNoExist = [];
        for (const item of data) {
            const student = await this.studentService.findStudentByFullName(item.Estudiante);
            if (typeof student === 'undefined') {
                const studentById = await this.studentService.findOne(item.Estudiante);
                if (typeof studentById === 'undefined') {
                    studentNoExist.push(item.Estudiante);
                }
            }
            if (typeof item.Plantel === 'number' && typeof item.Nivel === 'number') {
                const branchOffice = await this.branchOfficeService.findOne(item.Plantel, { relations: ['levels'] });
                const level = await this.levelService.findOne(item.Nivel, { relations: ['grades'] });
                const test = branchOffice.levels.includes(level);
                console.log(test);
            }
        }
        console.log(studentNoExist);
    }
}
