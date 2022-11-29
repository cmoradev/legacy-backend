import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class StorePaymentSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.query(`DROP VIEW IF EXISTS vw_tie_payments;`);
        await connection.query(`
        CREATE VIEW vw_tie_payments AS
        SELECT
            p.id AS p_id,
            f.id AS f_id,
            p.folio AS p_folio,
            v.folio AS v_folio,
            f.folio AS f_folio,
            f.uuid AS f_uuid,
            f.rfc AS f_rfc,
            f.invoiceType AS f_type,
            f.status AS f_status,
            p.cantidad AS p_quantity,
            p.cambio AS p_change,
            v.observaciones AS v_observations,
            CAST((p.cantidad - p.cambio) AS DECIMAL(12,6)) AS p_income,
            (SELECT SUM(CAST((cantidad - cambio) AS DECIMAL(12,6))) from tie_venta_pagos where saleId = p.saleId and id not in (p.id)) AS p_total_without_current,
            a.id AS a_id,
            a.id_modalidad AS a_tipo,
            a.matricula AS a_key,
            (CONCAT(a.nombre, ' ', a.ap_paterno, ' ', a.ap_materno)) AS a_fullname,
            v.cycleId AS v_cycle,
            v.storeBranchOfficeId AS v_branch_office,
            v.id_estado_pago AS v_status,
            p.createdAt AS p_created_at,
            f.createdAt AS f_created_at,
            p.timbrado AS p_stamping,
            p.systemPaymentStatusId AS p_state,
            (select p_way from vw_tie_way_payments where p_id = f.id Limit 1) AS f_metodo_pago_codigo,
            (select p_way_name from vw_tie_way_payments where p_id = f.id Limit 1) AS f_metodo_pago,
            (select p_way from vw_tie_way_payments where p_id = p.id Limit 1) AS p_metodo_pago_codigo,
            (select p_way_name from vw_tie_way_payments where p_id = p.id Limit 1) AS p_metodo_pago,
            p.globalUuid AS p_global_uuid,
            (CONCAT(u.nombre, ' ', u.ap_paterno, ' ', u.ap_materno)) AS u_fullname_cashier,
            (CONCAT(us.nombre, ' ', us.ap_paterno, ' ', us.ap_materno)) AS us_fullname_cancelation,
            u.id AS cashier_id,
            us.id AS cancelation_id,
            (CONCAT(vu.nombre, ' ', vu.ap_paterno, ' ', vu.ap_materno)) AS vu_fullname_cashier,
            (CONCAT(vuc.nombre, ' ', vuc.ap_paterno, ' ', vuc.ap_materno)) AS vuc_fullname_cancelation,
            vu.id as cashier_id_venta,
            vuc.id AS cancelation_id_venta,
            (SELECT GROUP_CONCAT(typeExtraCharge) FROM mini_store_details_extra_charges where miniSaleChargeDetailsId = vd.id ) as types_charges,
            (SELECT GROUP_CONCAT(quantity) FROM mini_store_details_extra_charges where miniSaleChargeDetailsId = vd.id ) as quantyties_charges,
            (SELECT GROUP_CONCAT(applicationType) FROM mini_store_details_extra_charges where miniSaleChargeDetailsId = vd.id ) as aplications_charges,
            vd.cantidad AS vd_quantity,
            vd.precio AS vd_price,
            vd.priceWithIVA AS vd_price_IVA,
            vd.id AS vd_id
        FROM tie_venta_pagos p

        LEFT JOIN tie_ventas v ON v.id = p.saleId
        LEFT JOIN tie_venta_detalle vd on vd.miniStoreSaleId = v.id
        LEFT JOIN alumnos a ON a.id = v.id_alumno
        LEFT JOIN tie_facturas f ON p.id = f.miniStoreSalePaymentId
        LEFT JOIN usuarios u ON u.id = f.agentBillingId
        LEFT JOIN usuarios us ON us.id = f.agentCancelingId
        LEFT JOIN usuarios vu ON vu.id = v.id_agente
        LEFT JOIN usuarios vuc ON vuc.id = v.agentCancelingId
        ORDER BY v.id DESC
        `);
    }
}
