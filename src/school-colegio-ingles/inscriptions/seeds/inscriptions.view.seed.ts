import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class InscriptionsViewSeeds implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const queryRunner = connection;
        await queryRunner.query(`DROP VIEW IF EXISTS vw_col_inscriptions`);
        await queryRunner.query(`
        CREATE VIEW vw_col_inscriptions AS 
        SELECT
            ins.id AS inscriptionId,
            ins.id_status AS inscriptionStatus,
            al.id AS studentId,
            al.statusStudentInscription as studentStatus,
            al.matricula AS studentRegistration,
            CONCAT(al.nombre, ' ', al.ap_paterno, ' ', al.ap_materno) AS studentName,
    		nv.id AS levelId,
    		nv.nivel AS levelName,
    		gd.id AS gradeId,
    		gd.grado AS gradeName,
    		cr.id AS groupId,
    		cr.grupo AS groupName,
            cl.id AS cycleId,
            cl.ciclo AS cycleName,
            cl.active AS cycleIsActive,
            pl.id AS campusId,
            pl.plantel AS campusName,
            ac.id AS agentCreatorId,
            CONCAT(ac.nombre, ' ', ac.ap_paterno, ' ', ac.ap_paterno) AS AgentCreatorName
		FROM inscripciones ins
		LEFT JOIN alumnos al ON al.id = ins.inscripStudentId
		LEFT JOIN niveles nv ON nv.id = ins.inscripLevelId
		LEFT JOIN grados gd ON gd.id = ins.inscripGradeId
		LEFT JOIN classroom cr ON cr.id = ins.inscripClassroomId
		LEFT JOIN ciclos cl ON cl.id = ins.inscripCycleId
		LEFT JOIN planteles pl ON pl.id = ins.inscripCampusId
		LEFT JOIN usuarios ac ON ac.id = ins.inscripAgentCreatorId
		ORDER BY nv.id DESC`);
    }
}