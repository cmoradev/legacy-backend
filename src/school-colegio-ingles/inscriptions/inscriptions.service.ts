import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Inscription } from './entities/inscription.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Like, Repository } from 'typeorm';
import { Student } from '../students/entities/student.entity';
import { Attendance, VerificarInscriprions } from './interfaces/inscriptions.interface';
import { VerifyregistratioDto } from './dto/verifyregistratio.dto';
import { ColegioDBNameConnection } from '../../common/databases/colegiodb.service';
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
import { PaymentPlanConceptsService } from '../payment-plan-concepts/payment-plan-concepts.service';
import * as moment from 'moment';
import { Moment } from 'moment';
import { PaymentPlanConcept } from '../payment-plan-concepts/entities/payment-plan-concept.entity';
import { IQueryReport } from '../school-payments/interfaces/IQueryReport';

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

interface MonthDate {
    name: string;
    numberMonth: string | number;
    date: string;
}

interface ITableImportInscription {
    Id: number,
    Estado: number | string,
    Estudiante: number | string,
    Grupo: number | string,
    Grado: number | string,
    Salon: number | string,
    'Plan de pago': number | string,
    'Variante de plan de estudio': number | string,
    'Plan de estudio': number | string,
    Mensualidades: number,
    Inscripciones: number
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
        readonly paymentPlansConceptsService: PaymentPlanConceptsService,
    ) {
        super(repo);
    }

    public async softDeleteOne(id: number) {
        const object = await this.findOne(id);
        if (!object) {
            throw new NotFoundException('This entity does not exists');
        }
        return await this.repo.softDelete(id);
    }

    public async softRestoreOne(id: number) {
        const object = await this.repo.findOne({id}, {withDeleted: true});
        if (!object) {
            throw new NotFoundException('This entity does not exists');
        }
        return await this.repo.restore(id);
    }


    public async destructurepayments(options: IQueryReport) {

        const inscripcion = this.repo.createQueryBuilder('inscription')
            .leftJoinAndSelect('inscription.schoolPayments', 'schoolPayments')
            .leftJoinAndSelect('inscription.inscripStudent', 'inscripStudent')
            .leftJoinAndSelect('inscription.inscripCampus', 'branchOffice')
            .leftJoinAndSelect('inscription.inscripCycle', 'inscripCycle')
            .leftJoinAndSelect('inscription.inscripLevel', 'inscripLevel')
            .leftJoinAndSelect('inscription.inscripGrade', 'inscripGrade')
            .leftJoinAndSelect('inscription.inscripClassroom', 'inscripClassroom')
            .where('inscription.idStatus != :status', {
                status: 0,
            })
            .andWhere('schoolPayments.payDate BETWEEN :startDate AND :endDate', {
                startDate: moment(options.month).startOf('month').toDate(),
                endDate: moment(options.month).startOf('month').toDate(),
            });
        if (options.cycleId !== 0 && options.cycleId !== '0' && typeof options.cycleId !== 'undefined') inscripcion.andWhere('inscripCycle.id = :cycleId', {cycleId: options.cycleId});
        if (options.branchOfficeId !== 0 && options.branchOfficeId !== '0' && typeof options.branchOfficeId !== 'undefined') inscripcion.andWhere('branchOffice.id = :branchOfficeId', {branchOfficeId: options.branchOfficeId});
        if (options.levelId !== 0 && options.levelId !== '0' && typeof options.levelId !== 'undefined') inscripcion.andWhere('inscripLevel.id = :levelId', {levelId: options.levelId});
        if (options.gradeId !== 0 && options.gradeId !== '0' && typeof options.gradeId !== 'undefined') inscripcion.andWhere('inscripGrade.id = :gradeId', {gradeId: options.gradeId});


        return await inscripcion.getMany();
    }

    public async reportAttendance(query: Attendance) {
        const result: ListQuery = {
            name: (await this.levelService.findOne({where: {id: query.levelId}})).name,
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
            .andWhere('inscripStudent.statusStudent = \'1\'')
            .andWhere('inscription.idStatus != \'0\'');
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

            console.log(JSON.stringify(data, null, 3))

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
                    {status: type},
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
        const relationsTrash = ['SchoolPayment', 'AssignmentInscription', 'User', 'BranchOffice', 'Cycle', 'Level'];
        const filteredRelations = relationships.filter(value => !relationsTrash.includes(value));
        const relationsResult: IRelationsInscriptions = {} as IRelationsInscriptions;
        for (const relation of filteredRelations) {
            const repository = await getRepository(relation, ColegioDBNameConnection);
            let relationData = await repository.find({cache: true});
            relationData = JSON.parse(JSON.stringify(relationData));
            relationsResult[relation] = relationData;
        }

        return {
            relations: relationsResult,
        };
    }

    addZeroDateMonth(day: number) {

        if (day <= 9) {
            return '0' + day;
        }
        return day;
    }

    getMonthsBetweenDate(dateStart: Moment, dateEnd: Moment): MonthDate[] {

        const dates: MonthDate[] = [];
        for (let i = dateStart.month(); i < 12; i++) {
            dates.push({
                name: moment.months(i),
                numberMonth: i + 1,
                date: dateStart.year() + '-' + this.addZeroDateMonth(i + 1) + '-' + this.addZeroDateMonth(1),
            });
        }
        for (let i = 0; i <= dateEnd.month(); i++) {
            dates.push({
                name: moment.months(i),
                numberMonth: i + 1,
                date: dateEnd.year() + '-' + this.addZeroDateMonth(i + 1) + '-' + this.addZeroDateMonth(1),
            });
        }
        return dates;
        // dateStart.year() + '-' + addZeroDateMonth(dateStart.month()) + '-' + addZeroDateMonth(dateStart.date());
    }

    async validateData(dataTable: ITableImportInscription[], preData: any) {
        const exceptions: { error: string, value: number | string }[] = [];
        const inscriptions: Inscription[] = [];
        let inscription: Inscription = {} as Inscription;
        for (const item of dataTable) {
            inscription = {schoolPayments: [] as unknown as SchoolPayment} as unknown as Inscription;
            if (typeof item.Estudiante === 'number') {
                const student = await this.studentService.findOne(item.Estudiante, {relations: ['studentCampus']});
                if (typeof student === 'undefined') {
                    exceptions.push({error: 'Estudiante no existe', value: item.Estudiante});
                }
                if (typeof student !== 'undefined') {
                    if (student.studentCampus.id !== preData.branchOfficeSchool.id) {
                        exceptions.push({error: `Estudiante no existe en el plantel`, value: item.Estudiante});
                    } else {
                        inscription.inscripStudent = {id: student.id} as Student;
                    }
                }
            } else {
                const student = await this.studentService.findStudentByFullName(item.Estudiante);
                if (typeof student !== 'undefined') inscription.inscripStudent = {id: student.id} as Student;
            }
            if (typeof item.Grado === 'number' && typeof item.Grupo === 'number') {
                const grade = await this.gradesService.findOne(item.Grado, {relations: ['groups']});
                const group = await this.groupsService.findOne(item.Grupo);
                if (typeof grade === 'undefined') {
                    exceptions.push({error: 'Grado no existe', value: item.Grado});
                    break;
                } else {
                    inscription.inscripGrade = {id: grade.id} as Grade;
                }
                if (typeof group === 'undefined') {
                    exceptions.push({error: 'Grupo no existe', value: item.Grupo});
                    break;
                } else {
                    inscription.inscripGroup = {id: group.id} as Group;
                }
            }
            if (typeof item['Plan de pago'] === 'number') {
                const paymentPlan = await this.paymentPlansService.findOne(item['Plan de pago']);
                if (typeof paymentPlan === 'undefined') {
                    exceptions.push({error: 'No existe plan de pago', value: item['Plan de pago']});
                    break;
                } else {
                    inscription.paymentPlan = {id: paymentPlan.id} as PaymentPlan;
                }
            }
            if (typeof item['Plan de pago'] === 'string') {
                const paymentPlan = await this.paymentPlansService.findOne({name: Like(`%${item['Plan de pago']}%`)});
                if (typeof paymentPlan === 'undefined') {
                    exceptions.push({error: 'No existe plan de pago', value: item['Plan de pago']});
                    break;
                } else {
                    inscription.paymentPlan = {id: paymentPlan.id} as PaymentPlan;
                }
            }
            if (typeof item['Plan de estudio'] === 'number') {
                const studyPlan = await this.studyPlansService.findOne(item['Plan de estudio']);
                if (typeof studyPlan === 'undefined') {
                    exceptions.push({error: 'Plan de estudio no existe', value: item['Plan de estudio']});
                    break;
                } else {
                    inscription.inscripStudyPlan = {id: studyPlan.id} as StudyPlan;
                }
            }
            if (typeof item['Plan de estudio'] === 'string') {
                const studyPlan = await this.studyPlansService.findOne({name: Like(item['Plan de estudio'])});
                if (typeof studyPlan === 'undefined') {
                    exceptions.push({error: 'Plan de estudio no existe', value: item['Plan de estudio']});
                    break;
                } else {
                    inscription.inscripStudyPlan = {id: studyPlan.id} as StudyPlan;
                }
            }
            if (typeof item['Variante de plan de estudio'] === 'number') {
                const studyPlanVariant = await this.studyPlanVariantService.findOne(item['Variante de plan de estudio']);
                if (typeof studyPlanVariant === 'undefined') {
                    exceptions.push({
                        error: 'Variante deplan de estudio no existe',
                        value: item['Variante de plan de estudio'],
                    });
                } else {
                    inscription.inscripStudyPlanVariant = {id: studyPlanVariant.id} as StudyPlanVariant;
                }
            }
            if (typeof item['Variante de plan de estudio'] === 'string') {
                const studyPlanVariant = await this.studyPlanVariantService.findOne({name: Like(item['Variante de plan de estudio'])});
                if (typeof studyPlanVariant === 'undefined') {
                    exceptions.push({
                        error: 'Variante deplan de estudio no existe',
                        value: item['Variante de plan de estudio'],
                    });
                } else {
                    inscription.inscripStudyPlanVariant = {id: studyPlanVariant.id} as StudyPlanVariant;
                }
            }
            if (typeof item.Salon === 'number') {
                const classroom = await this.classroomService.findOne(item.Salon);
                if (typeof classroom === 'undefined') {
                    exceptions.push({error: 'Salon no existe', value: item.Salon});
                    break;
                } else {
                    inscription.inscripClassroom = {id: classroom.id} as Classroom;
                }
            }
            if (typeof item.Salon === 'string') {
                const classroom = await this.classroomService.findOne({name: Like(item.Salon)});
                if (typeof classroom === 'undefined') {
                    exceptions.push({error: 'Salon no existe', value: item.Salon});
                    break;
                } else {
                    inscription.inscripClassroom = {id: classroom.id} as Classroom;
                }
            }
            if (item.Estado !== null && typeof item.Estado === 'number') {
                inscription.idStatus = Number(item.Estado);
            }
            if (item.Mensualidades !== null && typeof item.Mensualidades !== 'undefined' && typeof item['Plan de pago'] === 'number') {
                const concept = await this.paymentPlansConceptsService.paymentPlanConceptRepository.createQueryBuilder('concept')
                    .innerJoinAndSelect('concept.paymentPlan', 'paymentPlan')
                    .where('paymentPlan.id = :id', {id: item['Plan de pago']})
                    .andWhere('concept.name = :name', {name: item.Mensualidades})
                    .getOne();
                if (typeof concept === 'undefined') {
                    exceptions.push({
                        error: `Concepto no existe en plan de pago ${item['Plan de pago']}`,
                        value: item.Mensualidades,
                    });
                    break;
                } else {
                    const dates = this.getMonthsBetweenDate(moment(preData.cycleSchool.dateStart), moment(preData.cycleSchool.dateEnd));
                    for (const date of dates) {
                        inscription.schoolPayments.push({
                            description: `${concept.description} - ${date.name}` as string,
                            price: concept.price,
                            quantity: 1,
                            productCode: '',
                            satCode: concept.satCode || '',
                            payDate: date.date,
                            payDay: concept.startDay || 1,
                            payMonth: date.numberMonth as number,
                            unit: concept.unity,
                            unitCode: concept.unitCode,
                            withIva: concept.withIva || true,
                            paymentPlanConcept: {
                                id: concept.id,
                            } as PaymentPlanConcept,
                        } as unknown as SchoolPayment);
                    }
                }
            }
            if (item.Inscripciones !== null && typeof item.Inscripciones !== 'undefined' && typeof item['Plan de pago'] === 'number') {
                const concept = await this.paymentPlansConceptsService.paymentPlanConceptRepository.createQueryBuilder('concept')
                    .innerJoinAndSelect('concept.paymentPlan', 'paymentPlan')
                    .where('paymentPlan.id = :id', {id: item['Plan de pago']})
                    .andWhere('concept.name = :name', {name: item.Inscripciones})
                    .getOne();
                if (typeof concept === 'undefined') {
                    exceptions.push({
                        error: `Concepto no existe en plan de pago ${item['Plan de pago']}`,
                        value: item.Inscripciones,
                    });
                    break;
                } else {
                    const dates = this.getMonthsBetweenDate(moment(preData.cycleSchool.dateStart), moment(preData.cycleSchool.dateEnd));
                    inscription.schoolPayments.push({
                        id: concept.id,
                        description: `${concept.description} - ${dates[0].name}` as string,
                        price: concept.price,
                        quantity: 1,
                        productCode: '',
                        satCode: concept.satCode || '',
                        payDate: dates[0].date,
                        payDay: concept.startDay || 1,
                        payMonth: dates[0].numberMonth as number,
                        unit: concept.unity,
                        unitCode: concept.unitCode,
                        withIva: concept.withIva || true,
                        paymentPlanConcept: {
                            id: concept.id,
                        } as PaymentPlanConcept,
                    } as unknown as SchoolPayment);
                }
            }
            inscription.inscripCampus = {
                id: preData.branchOfficeSchool.id,
            } as BranchOffice;
            inscription.inscripCycle = {
                id: preData.cycleSchool.id,
            } as Cycle;
            inscription.inscripLevel = {
                id: preData.levelSchool,
            } as Level;
            inscriptions.push(inscription);
        }
        return {exceptions, inscriptions};

    }
}
