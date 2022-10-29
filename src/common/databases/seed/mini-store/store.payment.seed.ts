import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class StorePaymentSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.query(`DROP VIEW IF EXISTS vw_tie_payments;`);
        await connection.query(`
        CREATE VIEW vw_tie_payments AS
        SELECT
            tvp.id AS tvp_id,
            f.id AS f_id,
            tvp.folio AS tvp_folio,
            v.folio AS v_folio,
            f.folio AS f_folio,
            f.uuid AS f_uuid,
            f.rfc AS f_rfc,
            f.invoiceType AS f_type,
            f.status AS f_status,
            tvp.cantidad AS tvp_cantidad,
            tvp.cambio AS tvp_cambio,
            tvp.observaciones AS tvp_observaciones,
            CAST((tvp.cantidad - tvp.cambio) AS DECIMAL(12,6)) AS p_income,
            a.matricula AS a_key,
            (CONCAT(a.nombre, ' ', a.ap_paterno, ' ', a.ap_materno)) AS a_fullname,
            v.cycleId AS v_cycle,
            v.storeBranchOfficeId AS v_branch_office,
            v.id_estado_pago AS v_status,
            tvp.createdAt AS tvp_created_at,
            f.createdAt AS f_created_at,
            tvp.timbrado AS tvp_stamping,
            tvp.systemPaymentStatusId AS tvp_state,
            (select p_way from vw_tie_way_payments where p_id = f.id) AS f_metodo_pago_codigo,
            (select p_way_name from vw_tie_way_payments where p_id = f.id) AS f_metodo_pago,
            tvp.globalUuid AS tvp_global_uuid,
            (CONCAT(u.nombre, ' ', u.ap_paterno, ' ', u.ap_materno)) AS u_fullname_agent,
            (CONCAT(us.nombre, ' ', us.ap_paterno, ' ', us.ap_materno)) AS us_fullname_cancelation,
            u.id AS agent_id,
            us.id AS cancelation_id
        FROM tie_venta_pagos tvp
        
        LEFT JOIN tie_ventas v ON v.id = tvp.saleId
        LEFT JOIN alumnos a ON a.id = v.id_alumno
        LEFT JOIN tie_facturas f ON tvp.id = f.miniStoreSalePaymentId
        LEFT JOIN usuarios u ON u.id = f.agentBillingId
        LEFT JOIN usuarios us ON us.id = f.agentCancelingId
        
        ORDER BY v.id DESC;
        `);
    }
}
