import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class AcademyConceptTodayViewSeeds implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const queryRunner = connection;
        await queryRunner.query(`DROP VIEW IF EXISTS vw_aca_status_concepts`);
        await queryRunner.query(`
        CREATE VIEW vw_aca_status_concepts AS 

        SELECT 
            ins.id AS inscriptionId,
            ins.id_ciclo AS cycleId, 
            ins.id_estado_inscripcion AS inscriptionStatus,
            a.id AS studentId,
            a.matricula AS studentRegistration,
            CONCAT(a.nombre, ' ', a.ap_paterno, ' ', a.ap_materno) AS studentName,
            a.statusStudentInscription AS studentStatus, 
            ac.id AS academyId,
            ac.nombre AS academyName,           
            cr.id AS groupId,
            cr.nombre AS groupName,
            sp.id AS conceptId,
            sp.descripcion AS conceptName,
            sp.fecha_pagado AS conceptPaid,
            sp.fecha_pago AS conceptPay,
        sp.cantidad AS conceptQuantity,
            sp.precio AS conceptPrice,
            sp.id_estado_pago AS conceptStatus,
            pt.id AS branchOfficeId,
            pt.plantel AS branchOffice
        FROM ac_inscrip_conceptos sp
        
        LEFT JOIN ac_inscripciones_alumnos ins ON ins.id = sp.acInscriptionId
        LEFT JOIN alumnos a ON a.id = ins.id_alumno
        LEFT JOIN ac_academias ac ON sp.id_academia = ac.id
        LEFT JOIN ac_grupos cr ON cr.id = ins.id_ac_grupo
        LEFT JOIN planteles pt ON pt.id = ins.id_plantel
        
        WHERE sp.active = 1 AND sp.precio != 0
        
        ORDER BY cr.id, a.id DESC`);

    }
}
