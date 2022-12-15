import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class MyAcademiaPaymentSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.query(`DROP VIEW IF EXISTS vw_my_aca_payments;`);
        await connection.query(`
        CREATE VIEW vw_my_aca_payments AS
        SELECT
            p.id AS p_id,
            f.id AS f_id,
            v.id AS v_id,
            v.folio AS v_folio,
            p.folio AS p_folio,
            IF(f.folio IS NULL, (SELECT folio FROM ac_facturas where uuid = p.globalUuid), f.folio) as f_folio,
            f.uuid AS f_uuid,
            f.rfc AS f_rfc,
            f.invoiceType AS f_type,
            IF(f.status IS NULL, (SELECT status FROM ac_facturas where uuid = p.globalUuid), f.status) as f_status,
            p.quantity AS p_quantity,
            p.change AS p_change,
            v.observaciones AS v_observaciones,
            CAST((p.quantity - p.change) AS DECIMAL(12,6)) AS p_income,
            a.id AS a_id,
            a.id_modalidad AS a_type,
            a.matricula AS a_key,
            (CONCAT(a.nombre, ' ', a.ap_paterno, ' ', a.ap_materno)) AS a_fullname,
            p.academyPaymentOfficeId AS v_branch_office,
            v.ciclo AS v_cycle,
            v.id_estado_pago AS v_status,
            p.createdAt AS p_created_at,
            f.createdAt AS f_created_at,
            p.stamping AS p_stamping,
            p.paymentStatusId AS p_state,
            IF((select p_way_name from vw_aca_way_payments where p.id = f.id Limit 1) IS NULL, (select p_way_name from vw_aca_way_payments where p_id = p.id Limit 1), (select p_way_name from vw_aca_way_payments where p_id = f.id Limit 1)) AS f_metodo_pago,
            IF((select p_way from vw_aca_way_payments where p.id = f.id Limit 1) IS NULL, (select p_way from vw_aca_way_payments where p_id = p.id Limit 1), (select p_way from vw_aca_way_payments where p_id = f.id Limit 1)) AS f_metodo_pago_codigo,
            p.globalUuid AS p_global_uuid,
            (CONCAT(u.nombre, ' ', u.ap_paterno, ' ', u.ap_materno)) AS u_fullname_cashier,
            (CONCAT(us.nombre, ' ', us.ap_paterno, ' ', us.ap_materno)) AS us_fullname_cancelation,
            u.id AS cashier_id,
            us.id AS cancelation_id,
            pu.id AS p_cashier_id,
            puc.id AS p_cancelation_id

        FROM ac_charge_payments p

        LEFT JOIN ac_cobros v ON v.id = p.academyChargeId
        LEFT JOIN alumnos a ON a.id = v.id_alumno
        LEFT JOIN ac_facturas f ON p.id = f.academyChargePaymentId
        LEFT JOIN usuarios u ON u.id = v.id_agente
        LEFT JOIN usuarios us ON us.id = v.id_agente_cancelacion
        LEFT JOIN usuarios pu ON pu.id = p.cashierChargeId
        LEFT JOIN usuarios puc ON puc.id = p.cashierChargeCancellationId
        
        ORDER BY v.id DESC;
        `);
    }
}
