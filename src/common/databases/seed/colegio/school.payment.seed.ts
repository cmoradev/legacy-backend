import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class SchoolPaymentSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.query(`DROP VIEW IF EXISTS vw_sch_payments;`);
        await connection.query(`
        CREATE VIEW vw_sch_payments AS 
        SELECT
            p.id AS p_id,
            f.id AS f_id,
            bf.id AS bf_id_branch_office,
            bf.plantel AS bf_name_branch_office,
            v.folio AS v_folio,
            p.folio AS p_folio,
            f.folio AS f_folio,
            f.uuid AS f_uuid,
            f.rfc AS f_rfc,
            f.invoiceType AS f_type,
            f.status AS f_status,
            p.quantity AS p_quantity,
            p.change AS p_change,
            v.observations AS v_observations,
            CAST((p.quantity - p.change) AS DECIMAL(12,6)) AS p_income,
            a.matricula AS a_key,
            (CONCAT(a.nombre, ' ', a.ap_paterno, ' ', a.ap_materno)) AS a_fullname,
            v.schoolBranchOfficeSetId AS v_branch_office,
            v.schoolCycleId AS v_cycle,
            v.status AS v_status,
            p.createdAt AS p_created_at,
            f.createdAt AS f_created_at,
            p.stamping AS p_stamping,
            p.paymentStatusId AS p_state,
            (select p_way_name from vw_sch_way_payments where p_id = p.id) AS f_metodo_pago,
            (select p_way from vw_sch_way_payments where p_id = p.id) AS f_metodo_pago_codigo,
            p.globalUuid AS p_global_uuid,
            (CONCAT(u.nombre, ' ', u.ap_paterno, ' ', u.ap_materno)) AS u_fullname_cashier,
            (CONCAT(us.nombre, ' ', us.ap_paterno, ' ', us.ap_materno)) AS us_fullname_cancelation,
            u.id AS cashier_id,
            us.id AS cancelation_id
        FROM school_charge_payments p

        LEFT JOIN school_charges v ON v.id = p.schoolChargeId
        LEFT JOIN alumnos a ON a.id = v.schoolStudentId
        LEFT JOIN usuarios u ON u.id = v.cashierId
        LEFT JOIN usuarios us ON us.id = v.cashierCancellationId
        LEFT JOIN school_charges_invoice f ON p.id = f.schoolChargePaymentId
        LEFT JOIN planteles bf on bf.id = p.schoolPaymentOfficeId

        ORDER BY v.id DESC;
        `);
    }
}
