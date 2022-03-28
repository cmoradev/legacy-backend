import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class SchoolPaymentSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.query(`DROP VIEW IF EXISTS vw_sch_payments;`);
        await connection.query(`
        CREATE VIEW vw_sch_payments AS 
        SELECT
            v.folio AS v_folio,
            p.folio AS p_folio,
            f.folio AS f_folio,
            f.uuid AS f_uuid,
            f.rfc AS f_rfc,
            f.invoiceType AS f_type,
            f.status AS f_status,
            (p.quantity - p.change) AS p_income,
            a.matricula AS a_key,
            (CONCAT(a.nombre, ' ', a.ap_paterno, ' ', a.ap_materno)) AS a_fullname,
            v.academyBranchOfficeSetId AS v_branch_office,
            v.ciclo AS v_cycle,
            p.createdAt AS p_created_at,
            p.stamping AS p_stamping,
            p.paymentStatusId AS p_state_2
        FROM school_charge_payments p
        
        LEFT JOIN ac_cobros v ON v.id = p.schoolChargeId
        LEFT JOIN alumnos a ON a.id = v.id_alumno
        LEFT JOIN school_charges_invoice f ON p.id = f.schoolChargePaymentId
        
        ORDER BY v.id DESC;
        `);

    }
}
