import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class StorePaymentSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.query(`DROP VIEW IF EXISTS vw_tie_payments;`);
    await connection.query(`
        CREATE VIEW vw_tie_payments AS 
        SELECT
                p.id AS p_id,
                v.id AS v_id,
                f.id AS f_id,
                p.folio AS p_folio,
                v.folio AS v_folio,
                CASE 
                    WHEN f.folio IS NOT NULL THEN f.folio
                    WHEN p.globalUuid IS NOT NULL THEN 'Folio global'
                ELSE 'N/A' END AS f_folio,
                CASE 
                    WHEN f.status IS NOT NULL THEN f.status
                    WHEN p.globalUuid IS NOT NULL THEN 'Estatus global'
                ELSE 'N/A' END AS f_status,
                f.uuid AS f_uuid,
                f.rfc AS f_rfc,
                f.invoiceType AS f_type,
                p.cantidad AS p_quantity,
                p.cambio AS p_change,
                v.observaciones AS v_observations,
                CAST((p.cantidad - p.cambio) AS DECIMAL(12,6)) AS p_income,
                a.id AS a_id,
                a.id_modalidad AS a_type,
                a.matricula AS a_key,
                (CONCAT(a.nombre, ' ', a.ap_paterno, ' ', a.ap_materno)) AS a_fullname,
                v.cycleId AS v_cycle,
                v.storeBranchOfficeId AS v_branch_office,
                v.id_estado_pago AS v_status,
                p.createdAt AS p_created_at,
                f.createdAt AS f_created_at,
                p.timbrado AS p_stamping,
                p.systemPaymentStatusId AS p_state,
                (select p_way from vw_my_tie_way_payments where p_id = f.id LIMIT 1) AS f_metodo_pago_codigo,
                (select p_way_name from vw_my_tie_way_payments where p_id = f.id LIMIT 1) AS f_metodo_pago,
                p.globalUuid AS p_global_uuid,
                (CONCAT(u.nombre, ' ', u.ap_paterno, ' ', u.ap_materno)) AS u_fullname_cashier,
                (CONCAT(us.nombre, ' ', us.ap_paterno, ' ', us.ap_materno)) AS us_fullname_cancelation,
                (CONCAT(pu.nombre, ' ', pu.ap_paterno, ' ', pu.ap_materno)) AS p_fullname_cashier,
                (CONCAT(puc.nombre, ' ', puc.ap_paterno, ' ', puc.ap_materno)) AS p_fullname_cancelation,
                u.id AS cashier_id,
                us.id AS cancelation_id,
                pu.id AS p_cashier_id,
                puc.id AS p_cancelation_id,
                (select p_way from vw_tie_way_payments where p_id = p.id Limit 1) AS p_metodo_pago_codigo,
                (select p_way_name from vw_tie_way_payments where p_id = p.id Limit 1) AS p_metodo_pago,
                (SELECT 
                    GROUP_CONCAT(CONCAT(miniSaleChargeDetailsId, ';', typeExtraCharge, ';', quantity, ';', applicationType)) FROM mini_store_details_extra_charges
                    WHERE miniSaleChargeDetailsId IN (
                        SELECT id FROM tie_venta_detalle where miniStoreSaleId = v.id)
                ) AS extras,
                (SELECT SUM(CAST((cantidad - cambio) AS DECIMAL(12, 6))) from tie_venta_pagos
                    where saleId = v.id
                    and id not in (p.id)
                    and systemPaymentStatusId in (2,3)
                ) AS p_total_without_current,
                (SELECT 
                    GROUP_CONCAT(CONCAT(id,';',cantidad,';',priceWithIVA)) FROM tie_venta_detalle
                    where miniStoreSaleId = v.id
                ) AS details,
                (SELECT SUM(CAST((cantidad * priceWithIVA) AS DECIMAL(12, 6)))
                    FROM tie_venta_detalle
                    where miniStoreSaleId = v.id
                ) AS total_details_without_extra
            
        FROM tie_venta_pagos p
            
        LEFT JOIN tie_ventas v ON v.id = p.saleId
        LEFT JOIN alumnos a ON a.id = v.id_alumno
        LEFT JOIN tie_facturas f ON p.id = f.miniStoreSalePaymentId
        LEFT JOIN usuarios u ON u.id = f.agentBillingId
        LEFT JOIN usuarios pu ON pu.id = p.recaudadorId
        LEFT JOIN usuarios puc ON puc.id = p.paymentCancellerId
        LEFT JOIN usuarios us ON us.id = f.agentCancelingId
        ORDER BY v.id DESC;
        `);
  }
}
