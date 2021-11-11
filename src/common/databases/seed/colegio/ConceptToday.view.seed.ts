import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class ConceptTodayViewSeeds implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const queryRunner = connection;
        await queryRunner.query(`DROP VIEW IF EXISTS vw_status_concepts`);
        await queryRunner.query(`
        CREATE VIEW vw_status_concepts AS 

        SELECT 
            ins.id AS inscriptionId,
            ins.inscripCycleId AS cycleId, 
            a.id AS studentId,
            a.matricula AS studentRegistration,
            CONCAT(a.nombre, ' ', a.ap_paterno, ' ', a.ap_materno) AS studentName,
            n.id AS levelId,
            n.nivel AS levelName,
            gd.id AS gradeId,
            gd.grado AS gradeName,
            cr.id AS groupId,
            cr.grupo AS groupName,
            sp.id AS conceptId,
            sp.description AS conceptName,
            sp.paidDate AS conceptPaid,
            sp.payDate AS conceptPay,
            sp.quantity AS conceptQuantity,
            sp.price AS conceptPrice,
            sp.statusPayment AS conceptStatus,
            pt.id AS branchOfficeId,
            pt.plantel AS branchOffice
        FROM school_payment sp

        LEFT JOIN inscripciones ins ON ins.id = sp.inscriptionId
        LEFT JOIN alumnos a ON a.id = ins.inscripStudentId
        LEFT JOIN niveles n ON n.id = ins.inscripLevelId
        LEFT JOIN grados gd ON gd.id = ins.inscripGradeId
        LEFT JOIN classroom cr ON cr.id = ins.inscripClassroomId
        LEFT JOIN planteles pt ON pt.id = ins.inscripCampusId

        WHERE sp.isActive = 1 AND ins.id_status != 1 AND a.statusStudentInscription != 0

        ORDER BY n.id, gd.id, cr.id, a.id DESC`);

    }
}
