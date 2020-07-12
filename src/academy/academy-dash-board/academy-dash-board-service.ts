import {Injectable} from "@nestjs/common";
import {AcademyInscriptionService} from "../academy-inscription/academy-inscription.service";
import {StatusInscription} from "../academy-inscription/interface/StatusInscription.interface";
import {StudentsService} from "../../school-colegio-ingles/students/students.service";
import * as moment from "moment";
import { AcademyInscriptionConcepts } from "../academy-inscription-concepts/entities/academy-inscription-concepts.entity";
import { AcademyInscription } from "../academy-inscription/entities/academy-inscription.entity";


@Injectable()
export class AcademyDashBoardService {
    constructor(
        readonly academyInscriptionService: AcademyInscriptionService,
        readonly alumnosInscriptionService: StudentsService
    ) {
    }

    public async loadDash(query: { month: string, year: string, branchOfficeId: number, cycle: number }) {
        return {
            total_student_ac: await this.getTotalAlmunosAc(query),
            total_student_drop_ac: await this.getTotalBajaAlumnoAc(query),
            total_student_without_ac: await this.getTotalAlumnoSinAc(query),
            total_student_with_ac : await this.getTotalAlumnoConAc(query),
            total_student_included: await this.getTotalStudentIncluded(query),
            total_inscription_external: await  this.getInscripExternal(query),
            total_inscription_external_drop: await this.getInscriptExternalDrop(query),
            total_inscription_external_with: await this.getExternalWithInsc(query),
            total_inscription_external_without: await this.getExternalWithoutInsc(query),
        }
    }

    public async getTotalAlmunosAc(data:any){
        return await this.academyInscriptionService.repo.count( {
            where:[
                {
                    inscriptionStatus: StatusInscription.SignedUp,
                    inscriptionCampus: data.branchOfficeId,
                    cycle: data.cycle,
                    isActive: true
                }
            ]
        });
    }

    public async getTotalBajaAlumnoAc(data:any){
        return await this.academyInscriptionService.repo.count( {
            where:[
                {
                    inscriptionStatus: StatusInscription.Baja,
                    cycle: data.cycle,
                    inscriptionCampus: data.branchOfficeId
                }
            ]
        });
    }

    public async getTotalAlumnoConAc(data: any){
        //const query = await this.alumnosInscriptionService.repo.createQueryBuilder('alumno').where('alumno.id NOT IN (select id_alumno from ac_inscripciones_alumnos)');
        const query = this.academyInscriptionService.repo.createQueryBuilder('inscripcion')
            .innerJoinAndSelect('inscripcion.concepts', 'concepts',
            'YEAR(concepts.payDate) = :yearPay AND MONTH(concepts.payDate) = :monthPay AND concepts.id_concepto_cobro = :idT AND concepts.active = :active', {
                yearPay: data.year,
                monthPay: data.month,
                idT: 2,
                active: true,
                isIncluded: false
            })
            .innerJoinAndSelect((qb) => {
                    return qb.from(AcademyInscriptionConcepts, 'conceptsQuery');
                },
                'conceptsQuery', 'conceptsQuery.acInscriptionId = inscripcion.id')
            .where('inscripcion.id_plantel = :idPlantel', {
                idPlantel: data.branchOfficeId
            })
            .andWhere('inscripcion.id_ciclo = :idCiclo', {
                idCiclo: data.cycle
            })
            .andWhere('inscripcion.incluida = :included', {
                included: false
            })
            .andWhere('inscripcion.id_estado_inscripcion = :idStatus', {
                idStatus: 2
            }).orderBy('inscripcion.id')

        //console.log("query 1 ", query.getQuery());
        //const query = await this.academyInscriptionService.repo.createQueryBuilder('inscription').where('(ac_inscripciones_alumnos.id_academia NOT IN (select ac_inscrip_conceptos.id_academia from ac_inscrip_conceptos where (ac_inscrip_conceptos.id_concepto_cobro = 2 AND ac_inscrip_conceptos.active = 1 AND YEAR(ac_inscrip_conceptos.fecha_pago) = 2020 AND MONTH(ac_inscrip_conceptos.fecha_pago) = 7)))');
        return query.getCount();
    }

    public async getTotalAlumnoSinAc(data: any){
        //const query = await this.academyInscriptionService.repo.createQueryBuilder('inscription').where('(ac_inscripciones_alumnos.id_academia IN (select ac_inscrip_conceptos.id_academia from ac_inscrip_conceptos where (ac_inscrip_conceptos.id_concepto_cobro = 2 AND ac_inscrip_conceptos.active = 1 AND YEAR(ac_inscrip_conceptos.fecha_pago) = 2020 AND MONTH(ac_inscrip_conceptos.fecha_pago) = 7)))');

        //console.log("Request data ", data);
        const query = this.academyInscriptionService.repo.createQueryBuilder('inscripcion')
            .leftJoinAndSelect('inscripcion.concepts', 'concepts',
                'YEAR(concepts.payDate) = :yearPay AND MONTH(concepts.payDate) = :monthPay AND concepts.id_concepto_cobro = :idT AND concepts.active = :active', {
                    yearPay: data.year,
                    monthPay: data.month,
                    idT: 2,
                    active: true,
                })
            .leftJoinAndSelect((qb) => {
                    return qb.from(AcademyInscriptionConcepts, 'conceptsQuery');
                },
                'conceptsQuery', 'conceptsQuery.acInscriptionId = :inscription', {
                    inscription: null
                })
            .where('inscripcion.id_plantel = :idPlantel', {
                idPlantel: data.branchOfficeId
            })
            .andWhere('inscripcion.id_ciclo = :idCiclo', {
                idCiclo: data.cycle
            })
            .andWhere('inscripcion.incluida = :included', {
                included: false
            })
            .andWhere('inscripcion.id_estado_inscripcion = :idStatus', {
                idStatus: 2
            }).groupBy('conceptsQuery.acInscriptionId')

        return query.getCount();
    }

    async getTotalStudentIncluded(data:any){
        return await this.academyInscriptionService.repo.count( {
            where:[
                {
                    inscriptionStatus: StatusInscription.SignedUp,
                    isIncluded: true,
                    cycle: data.cycle,
                    inscriptionCampus: data.branchOfficeId
                }
            ]
        });
    }


    async getInscripExternal(data:any){
        const query = await this.alumnosInscriptionService.repo.createQueryBuilder('student')
            .innerJoinAndSelect('student.studentAcInscriptions', 'inscriptions',
            'inscriptions.id_estado_inscripcion = :idStatus AND inscriptions.id_ciclo = :idCycle AND inscriptions.id_plantel = :inscriptionCampus AND active = :isActive', {
                idStatus: StatusInscription.SignedUp,
                idCycle: data.cycle,
                inscriptionCampus: data.branchOfficeId,
                cycle: data.cycle,
                isActive: true
            })
            // .innerJoinAndSelect((qb) => {
            //         return qb.from(AcademyInscription, 'inscriptionsQuery');
            //     },
            //     'inscriptionsQuery', 'inscriptionsQuery.id_alumno = student.id')
            .where('student.id_modalidad = :idModalidad', {
                idModalidad:2
            // })
            // .andWhere('inscriptionsQuery.id_plantel = :branchOfficeId',{
            //     branchOfficeId: data.branchOfficeId
            }).groupBy('student.id')

        return query.getCount();
    }

    async getInscriptExternalDrop(data) {
        const query = await this.alumnosInscriptionService.repo.createQueryBuilder('student')
            .innerJoinAndSelect('student.studentAcInscriptions', 'inscriptions',
                'inscriptions.id_estado_inscripcion = :idStatus AND inscriptions.id_ciclo = :idCycle AND inscriptions.id_plantel = :inscriptionCampus', {
                    idStatus: StatusInscription.Baja,
                    idCycle: data.cycle,
                    inscriptionCampus: data.branchOfficeId
                })
            // .innerJoinAndSelect((qb) => {
            //         return qb.from(AcademyInscription, 'inscriptionsQuery');
            //     },
            //     'inscriptionsQuery', 'inscriptionsQuery.id_alumno = student.id')
            .where('student.id_modalidad = :idModalidad', {
                idModalidad:2
            })
            // .andWhere('inscriptionsQuery.id_plantel = :branchOfficeId',{
            //     branchOfficeId: data.branchOfficeId
            // })
            .groupBy('inscriptionsQuery.id')


        return query.getCount()
    }

    async getExternalWithInsc(data: any){
        const query = await this.alumnosInscriptionService.repo.createQueryBuilder('student')
            .innerJoinAndSelect('student.studentAcInscriptions', 'inscriptions',
                'inscriptions.id_estado_inscripcion = :idStatus AND inscriptions.id_ciclo = :idCycle AND inscriptions.id_plantel = :inscriptionCampus AND active = :isActive', {
                    idStatus: StatusInscription.SignedUp,
                    idCycle: data.cycle,
                    inscriptionCampus: data.branchOfficeId,
                    cycle: data.cycle,
                    isActive: true
                }).innerJoinAndSelect((qb) => {
                    return qb.from(AcademyInscription, 'inscriptionsQuery');
                },
                'inscriptionsQuery', 'inscriptionsQuery.id_alumno = student.id')
            .innerJoinAndSelect('inscriptions.concepts', 'concepts',
            'YEAR(concepts.payDate) = :yearPay AND MONTH(concepts.payDate) = :monthPay AND concepts.id_concepto_cobro = :idT', {
                yearPay: data.year,
                monthPay: data.month,
                idT: 2,
                active: true
            })
            .innerJoinAndSelect((qb) => {
                    return qb.from(AcademyInscriptionConcepts, 'conceptsQuery');
                },
                'conceptsQuery', 'conceptsQuery.acInscriptionId = inscriptionsQuery.id')
            .where('student.id_modalidad = :idModalidad', {
                idModalidad:2
            })
            // .andWhere('inscriptionsQuery.id_plantel = :branchOfficeId',{
            //     branchOfficeId: data.branchOfficeId
            // })
            .groupBy('inscriptionsQuery.id_alumno')

        return query.getCount()
    }

    async getExternalWithoutInsc(data: any){
        const query = await this.alumnosInscriptionService.repo.createQueryBuilder('student')
            .innerJoinAndSelect('student.studentAcInscriptions', 'inscriptions',
                'inscriptions.id_estado_inscripcion = :idStatus AND inscriptions.id_ciclo = :idCycle AND inscriptions.id_plantel = :inscriptionCampus AND active = :isActive', {
                    idStatus: StatusInscription.SignedUp,
                    idCycle: data.cycle,
                    inscriptionCampus: data.branchOfficeId,
                    cycle: data.cycle,
                    isActive: true
            })
            // .leftJoinAndSelect((qb) => {
                //     return qb.from(AcademyInscription, 'inscriptionsQuery');
                // },
                // 'inscriptionsQuery', 'inscriptionsQuery.id_alumno = student.id')
            .leftJoinAndSelect('inscriptions.concepts', 'concepts',
                'YEAR(concepts.payDate) = :yearPay AND MONTH(concepts.payDate) = :monthPay AND concepts.id_concepto_cobro = :idT', {
                    yearPay: data.year,
                    monthPay: data.month,
                    idT: 2,
                    active: true
                })
            .leftJoinAndSelect((qb) => {
                    return qb.from(AcademyInscriptionConcepts, 'conceptsQuery');
                },
                'conceptsQuery', 'conceptsQuery.acInscriptionId = :inscriptionId', {
                    inscriptionId: null
                })
            .where('student.id_modalidad = :idModalidad', {
                idModalidad:2
            })
            // .andWhere('inscriptionsQuery.id_plantel = :branchOfficeId',{
            //     branchOfficeId: data.branchOfficeId
            // })
            .groupBy('inscriptionsQuery.id_alumno')

        return query.getCount()

    }
}