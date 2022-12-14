import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class MySchoolPaymentSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.query(`DROP VIEW IF EXISTS vw_my_sch_payments;`);
        await connection.query(`
        CREATE VIEW vw_my_sch_payments AS 
        SELECT
            p.id                                                                                                  AS p_id,
            v.id                                                                                                  AS v_id,
            f.id                                                                                                  AS f_id,
            v.folio                                                                                               AS v_folio,
            p.folio                                                                                               AS p_folio,
            IF(f.folio IS NULL, (SELECT folio FROM school_charges_invoice where uuid = p.globalUuid), f.folio) as f_folio,
            f.uuid                                                                                                AS f_uuid,
            f.rfc                                                                                                 AS f_rfc,
            f.invoiceType                                                                                         AS f_type,
            IF(f.status IS NULL, (SELECT status FROM school_charges_invoice where uuid = p.globalUuid), f.status) as f_status,
            p.quantity                                                                                            AS p_quantity,
            p.change                                                                                              AS p_change,
            p.observations                                                                                        AS v_observations,
            CAST((p.quantity - p.change) AS DECIMAL(12,6))                                                        AS p_income,
            a.id                                                                                                  AS a_id,
            a.id_modalidad                                                                                        AS a_type,
            a.matricula                                                                                           AS a_key,
            (CONCAT(a.nombre, ' ', a.ap_paterno, ' ', a.ap_materno))                                              AS a_fullname,
            p.schoolPaymentOfficeId                                                                               AS v_branch_office,
            v.schoolCycleId                                                                                       AS v_cycle,
            v.status AS v_status,
            p.createdAt AS p_created_at,
            IF(f.createdAt IS NULL, (p.createdAt), f.createdAt) AS f_created_at,
            p.stamping AS p_stamping,
            p.paymentStatusId AS p_state,
            IF((select p_way_name from vw_sch_way_payments where p.id = f.id Limit 1) IS NULL, (select p_way_name from vw_sch_way_payments where p_id = p.id Limit 1), (select p_way_name from vw_sch_way_payments where p_id = f.id Limit 1)) AS f_metodo_pago,
            IF((select p_way from vw_sch_way_payments where p.id = f.id Limit 1) IS NULL, (select p_way from vw_sch_way_payments where p_id = p.id Limit 1), (select p_way from vw_sch_way_payments where p_id = f.id Limit 1)) AS f_metodo_pago_codigo,
            p.globalUuid AS p_global_uuid,
            (CONCAT(u.nombre, ' ', u.ap_paterno, ' ', u.ap_materno)) AS u_fullname_cashier,
            (CONCAT(us.nombre, ' ', us.ap_paterno, ' ', us.ap_materno)) AS us_fullname_cancelation,
            (CONCAT(pu.nombre, ' ', pu.ap_paterno, ' ', pu.ap_materno)) AS p_fullname_cashier,
            (CONCAT(puc.nombre, ' ', puc.ap_paterno, ' ', puc.ap_materno)) AS p_fullname_cancelation,
            u.id AS cashier_id,
            us.id AS cancelation_id,
            pu.id AS p_cashier_id,
            puc.id AS p_cancelation_id

        FROM school_charge_payments p

        LEFT JOIN school_charges v ON v.id = p.schoolChargeId
        LEFT JOIN alumnos a ON a.id = v.schoolStudentId
        LEFT JOIN usuarios u ON u.id = v.cashierId
        LEFT JOIN usuarios us ON us.id = v.cashierCancellationId
        LEFT JOIN school_charges_invoice f ON p.id = f.schoolChargePaymentId
        LEFT JOIN usuarios pu ON pu.id = p.cashierChargeId
        LEFT JOIN usuarios puc ON puc.id = p.cashierChargeCancellationId


        ORDER BY v.id DESC;
        `);
    }
}
