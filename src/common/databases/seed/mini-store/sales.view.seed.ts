import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

export default class SalesViewSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await connection.query(`DROP VIEW IF EXISTS vw_tie_sales;`);
        await connection.query(`
        CREATE VIEW vw_tie_sales AS
        SELECT v.id                                                                      AS v_id,
       v.folio                                                                   AS v_folio,
       v.id_estado_pago                                                          AS v_status,
       v.createdAt                                                               AS v_created_at,
       a.id                                                                      AS a_id,
       a.id_modalidad                                                            AS a_type,
       a.matricula                                                               AS a_key,
       (CONCAT(a.nombre, ' ', a.ap_paterno, ' ', a.ap_materno))                  AS a_fullname,
       v.cycleId                                                                 AS v_cycle,
       v.storeBranchOfficeId                                                     AS v_branch_office,
       v.observaciones                                                           AS v_observations,
       (CONCAT(u.nombre, ' ', u.ap_paterno, ' ', u.ap_materno))                  AS u_fullname_cashier,
       (CONCAT(us.nombre, ' ', us.ap_paterno, ' ', us.ap_materno))               AS us_fullname_cancelation,
       (SELECT GROUP_CONCAT(CONCAT(miniSaleChargeDetailsId, ';', typeExtraCharge, ';', quantity, ';', applicationType))
        FROM mini_store_details_extra_charges
        where miniSaleChargeDetailsId IN
              (SELECT id FROM tie_venta_detalle where miniStoreSaleId = v.id)) AS extras,
       (SELECT SUM(CAST((cantidad - cambio) AS DECIMAL(12, 6)))
        from tie_venta_pagos
        where saleId = v.id
          and systemPaymentStatusId in (2, 3))                                   AS p_total_without_current,
       (SELECT GROUP_CONCAT(CONCAT(id, ';', cantidad, ';', priceWithIVA))
        FROM tie_venta_detalle
        where miniStoreSaleId = v.id)                                          AS details,
        (SELECT GROUP_CONCAT(CONCAT(id, ';', product_name))
        FROM tie_venta_detalle
        where miniStoreSaleId = v.id)                                          AS details_names,
       (SELECT SUM(CAST((cantidad * priceWithIVA) AS DECIMAL(12, 6)))
        FROM tie_venta_detalle
        where miniStoreSaleId = v.id)                                          AS total_details_without_extra

        FROM tie_ventas v

         LEFT JOIN usuarios u ON u.id = v.id_agente
         LEFT JOIN usuarios us ON us.id = v.agentCancelingId
         LEFT JOIN alumnos a ON a.id = v.id_alumno
        ORDER BY v.id DESC;
        `)
    }
}
